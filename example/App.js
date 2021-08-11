import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function App() {
  const [result, setResult] = React.useState();
  const [deviceName,setDeviceName] = React.useState();

  React.useEffect(() => {
    setResult(global.helloWorld())
  }, []);

  return (
    <View style={styles.container}>
      <Text >Result: {result}</Text>

      <TouchableOpacity
        onPress={() => {
          let perf = performance.now();
          let value = global.getDeviceName();
          console.log(performance.now() - perf);
          setDeviceName(value);
        }}
        style={styles.button}
      >
        <Text style={styles.buttonTxt}>
          Device Name: {deviceName}
        </Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  button: {
    width: '95%',
    alignSelf: 'center',
    height: 40,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:5,
    marginTop:10

  },
  buttonTxt: {
    color: "white"
  }
});
