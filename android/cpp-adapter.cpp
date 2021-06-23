#include <jni.h>
#include "example.h"

extern "C"
JNIEXPORT void JNICALL
Java_com_reactnativesimplejsi_SimpleJsiModule_nativeInstall(JNIEnv *env, jobject thiz, jlong jsi) {

    auto runtime = reinterpret_cast<facebook::jsi::Runtime *>(jsi);


    if (runtime) {
        example::install(*runtime);
    }
}

