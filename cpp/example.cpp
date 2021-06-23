#include "example.h"
#include <jsi/jsi.h>

using namespace facebook::jsi;
using namespace std;

namespace example {

void install(Runtime &jsiRuntime) {
    
    auto helloWorld = Function::createFromHostFunction(jsiRuntime,
                                                       PropNameID::forAscii(jsiRuntime,
                                                                            "helloWorld"),
                                                       0,
                                                       [](Runtime &runtime,
                                                          const Value &thisValue,
                                                          const Value *arguments,
                                                          size_t count) -> Value {
        string helloworld = "helloworld";
        
        
        return Value(runtime,
                     String::createFromUtf8(
                                            runtime,
                                            helloworld));
        
    });
    
    jsiRuntime.global().setProperty(jsiRuntime, "helloWorld", move(helloWorld));
    
    auto multiply = Function::createFromHostFunction(jsiRuntime,
                                                     PropNameID::forAscii(jsiRuntime,
                                                                          "multiply"),
                                                     2,
                                                     [](Runtime &runtime,
                                                        const Value &thisValue,
                                                        const Value *arguments,
                                                        size_t count) -> Value {
        int x = arguments[0].getNumber();
        int y = arguments[1].getNumber();
        
        return Value(x * y);
        
    });
    
    jsiRuntime.global().setProperty(jsiRuntime, "multiply", move(multiply));
    
    auto multiplyWithCallback = Function::createFromHostFunction(jsiRuntime,
                                                                 PropNameID::forAscii(jsiRuntime,
                                                                                      "multiplyWithCallback"),
                                                                 3,
                                                                 [](Runtime &runtime,
                                                                    const Value &thisValue,
                                                                    const Value *arguments,
                                                                    size_t count) -> Value {
        int x = arguments[0].getNumber();
        int y = arguments[1].getNumber();
        
        arguments[2].getObject(runtime).getFunction(runtime).call(runtime, x * y);
        
        return Value();
        
    });
    
    jsiRuntime.global().setProperty(jsiRuntime, "multiplyWithCallback", move(multiplyWithCallback));
}

}
