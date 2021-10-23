# react-native-jsi-template

This is an example library that explains how anyone can build jsi modules from scratch in React Native. This code is written as a support project for my [blog](https://blog.notesnook.com/getting-started-react-native-jsi/).

## Installation

```sh
npm install react-native-simple-jsi
```

## Prerequisites
You must have Android NDK and CMake installed on android to build the library.

## Methods
The following methods are implemented.

### Platfom agnostic
The relevant code is present in `cpp/example.cpp` file.
```ts
    helloWorld():string;

    multiplyWithCallback(x:number,y:number,callback:(z:number) => void):void
    
    multiply(x:number,y:number):number
```

### Platform specific
The relevant code on android is in `android/cpp-adapter.cpp` and `ios/SimpleJsi.mm` on iOS.
```ts
    getDeviceName():string
    
    setItem(key:string,value:string):boolean

    getItem(key:string):string
```

## Basic usage example
```tsx
import simpleJsiModule from "react-native-jsi-template";

simpleJsiModule.helloWorld() // returns helloworld.
```
Run the example app for more.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
