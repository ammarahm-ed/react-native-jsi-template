#import "SimpleJsi.h"
#import <React/RCTBridge+Private.h>
#import <React/RCTUtils.h>
#import <jsi/jsi.h>
#import "example.h"
#import <sys/utsname.h>
#import "YeetJSIUtils.h"

using namespace facebook::jsi;
using namespace std;

@implementation SimpleJsi

@synthesize bridge = _bridge;
@synthesize methodQueue = _methodQueue;

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup {
    
    return YES;
}

- (void)setBridge:(RCTBridge *)bridge {
    _bridge = bridge;
    _setBridgeOnMainQueue = RCTIsMainQueue();
    [self installLibrary];
}

- (void)installLibrary {
    
    RCTCxxBridge *cxxBridge = (RCTCxxBridge *)self.bridge;
    
    if (!cxxBridge.runtime) {
        
        /**
         * This is a workaround to install library
         * as soon as runtime becomes available and is
         * not recommended. If you see random crashes in iOS
         * global.xxx not found etc. use this.
         */
        
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, 0.001 * NSEC_PER_SEC),
                       dispatch_get_main_queue(), ^{
            /**
             When refreshing the app while debugging, the setBridge
             method is called too soon. The runtime is not ready yet
             quite often. We need to install library as soon as runtime
             becomes available.
             */
            [self installLibrary];
            
        });
        return;
    }
    
    example::install(*(facebook::jsi::Runtime *)cxxBridge.runtime);
    install(*(facebook::jsi::Runtime *)cxxBridge.runtime, self);
}


- (NSString *) getModel {
    struct utsname systemInfo;
    uname(&systemInfo);
    
    return [NSString stringWithCString:systemInfo.machine encoding:NSUTF8StringEncoding];
}

- (void) setItem:(NSString * )key :(NSString *)value {
    NSUserDefaults *standardUserDefaults = [NSUserDefaults standardUserDefaults];
    [standardUserDefaults setObject:value forKey:key];
    [standardUserDefaults synchronize];
}

- (NSString *)getItem:(NSString *)key {
    NSUserDefaults *standardUserDefaults = [NSUserDefaults standardUserDefaults];
    return [standardUserDefaults stringForKey:key];
}


static void install(jsi::Runtime &jsiRuntime, SimpleJsi *simpleJsi) {
    auto getDeviceName = Function::createFromHostFunction(jsiRuntime,
                                                          PropNameID::forAscii(jsiRuntime,
                                                                               "getDeviceName"),
                                                          0,
                                                          [simpleJsi](Runtime &runtime,
                                                                   const Value &thisValue,
                                                                   const Value *arguments,
                                                                   size_t count) -> Value {
        
        jsi::String deviceName = convertNSStringToJSIString(runtime, [simpleJsi getModel]);
        
        return Value(runtime, deviceName);
    });
    
    jsiRuntime.global().setProperty(jsiRuntime, "getDeviceName", move(getDeviceName));
    
    auto setItem = Function::createFromHostFunction(jsiRuntime,
                                                    PropNameID::forAscii(jsiRuntime,
                                                                         "setItem"),
                                                    2,
                                                    [simpleJsi](Runtime &runtime,
                                                             const Value &thisValue,
                                                             const Value *arguments,
                                                             size_t count) -> Value {
        
        NSString *key = convertJSIStringToNSString(runtime, arguments[0].getString(runtime));
        NSString *value = convertJSIStringToNSString(runtime, arguments[1].getString(runtime));
        
        [simpleJsi setItem:key :value];
        
        return Value(true);
    });
    
    jsiRuntime.global().setProperty(jsiRuntime, "setItem", move(setItem));
    
    
    auto getItem = Function::createFromHostFunction(jsiRuntime,
                                                    PropNameID::forAscii(jsiRuntime,
                                                                         "getItem"),
                                                    0,
                                                    [simpleJsi](Runtime &runtime,
                                                             const Value &thisValue,
                                                             const Value *arguments,
                                                             size_t count) -> Value {
        
        NSString *key = convertJSIStringToNSString(runtime, arguments[0].getString(runtime));
        
        NSString *value = [simpleJsi getItem:key];
        
        return Value(runtime, convertNSStringToJSIString(runtime, value));
    });
    
    jsiRuntime.global().setProperty(jsiRuntime, "getItem", move(getItem));
    
    
    
}


@end
