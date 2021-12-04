#include "example.h"
#include <jsi/jsi.h>
#include <string.h>
#include <math.h>

using namespace facebook::jsi;
using namespace std;

namespace example {

    int calculateFactorial(int n) {
        if (n > 1)
            return n * calculateFactorial(n - 1);
        else
            return 1;
    }

    void install(Runtime &jsiRuntime) {

        auto helloWorld = Function::createFromHostFunction(jsiRuntime,
                                                           PropNameID::forAscii(jsiRuntime,
                                                                                "helloWorld"), 0,
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

        auto factorial = Function::createFromHostFunction(jsiRuntime,
                                                          PropNameID::forAscii(jsiRuntime,
                                                                               "factorial"), 1,
                                                          [](Runtime &runtime,
                                                             const Value &thisValue,
                                                             const Value *arguments,
                                                             size_t count) -> Value {
                                                              return Value(calculateFactorial(
                                                                      arguments[0].getNumber()));

                                                          });

        jsiRuntime.global().setProperty(jsiRuntime, "factorial", move(factorial));


        auto loop = Function::createFromHostFunction(jsiRuntime,
                                                     PropNameID::forAscii(jsiRuntime,
                                                                          "loop"), 1,
                                                     [](Runtime &runtime,
                                                        const Value &thisValue,
                                                        const Value *arguments,
                                                        size_t count) -> Value {
                                                         int num = arguments[0].getNumber();
                                                         for (int i = 0; i < num; i++) {

                                                         }
                                                         return Value(num);
                                                     });

        jsiRuntime.global().setProperty(jsiRuntime, "loop", move(loop));

        auto getOneByPi = Function::createFromHostFunction(jsiRuntime,
                                                           PropNameID::forAscii(jsiRuntime,
                                                                                "getOneByPi"), 1,
                                                           [](Runtime &runtime,
                                                              const Value &thisValue,
                                                              const Value *arguments,
                                                              size_t count) -> Value {
                                                               double ak = 6.0 - 4 * sqrt(2);
                                                               double yk = sqrt(2) - 1.0;
                                                               double ak1;
                                                               double yk1;
                                                               for (int i = 0; i <
                                                                               arguments[0].getNumber(); i++) {
                                                                   yk1 = (1 - pow(
                                                                           (1 - yk * yk * yk * yk),
                                                                           (0.25))) / (1 + pow(
                                                                           (1 - yk * yk * yk * yk),
                                                                           (0.25)));
                                                                   ak1 = ak *
                                                                         pow((1 + yk1), 4) -
                                                                         pow(2, 2 * i + 3) *
                                                                         yk1 *
                                                                         (1 + yk1 + yk1 * yk1);
                                                                   yk = yk1;
                                                                   ak = ak1;
                                                               }
                                                               return Value(ak);
                                                           });

        jsiRuntime.global().setProperty(jsiRuntime, "getOneByPi", move(getOneByPi));

        auto gaussLegendre = Function::createFromHostFunction(jsiRuntime,
                                                              PropNameID::forAscii(jsiRuntime,
                                                                                   "gaussLegendre"),
                                                              1,
                                                              [](Runtime &runtime,
                                                                 const Value &thisValue,
                                                                 const Value *arguments,
                                                                 size_t count) -> Value {

                                                                  double a = 1.0;
                                                                  double b = 1 / sqrt(2);
                                                                  double t = 1.0 / 4.0;
                                                                  double p = 1.0;

                                                                  for (int i = 0; i <
                                                                                  arguments[0].getNumber(); i++) {
                                                                      double aNext = (a + b) / 2;
                                                                      double bNext = sqrt(a * b);
                                                                      double tNext = t - p * pow(a -
                                                                                                 aNext,
                                                                                                 2);
                                                                      double pNext = 2 * p;
                                                                      a = aNext;
                                                                      b = bNext;
                                                                      t = tNext;
                                                                      p = pNext;
                                                                  }
                                                                  double resD =
                                                                          pow(a + b, 2) / (4 * t);
                                                                  return Value(resD);

                                                              });

        jsiRuntime.global().setProperty(jsiRuntime, "gaussLegendre", move(gaussLegendre));

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
                                                                     PropNameID::forAscii(
                                                                             jsiRuntime,
                                                                             "multiplyWithCallback"),
                                                                     3,
                                                                     [](Runtime &runtime,
                                                                        const Value &thisValue,
                                                                        const Value *arguments,
                                                                        size_t count) -> Value {
                                                                         int x = arguments[0].getNumber();
                                                                         int y = arguments[1].getNumber();

                                                                         arguments[2].getObject(
                                                                                 runtime).getFunction(
                                                                                 runtime).call(
                                                                                 runtime, x * y);

                                                                         return Value();

                                                                     });

        jsiRuntime.global().setProperty(jsiRuntime, "multiplyWithCallback",
                                        move(multiplyWithCallback));
    }

}
