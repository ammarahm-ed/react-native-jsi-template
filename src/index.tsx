import { NativeModules } from 'react-native';

type SimpleJsiType = {
  multiply(a: number, b: number): Promise<number>;
};

const { SimpleJsi } = NativeModules;

export default SimpleJsi as SimpleJsiType;
