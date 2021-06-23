import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function App() {
  const [result, setResult] = React.useState();

  React.useEffect(() => {
    setResult(global.helloWorld())
  }, []);


  global.callbackTest(2,4,(a) => {
    console.log(a,"got value"); 
  })

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
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
});
