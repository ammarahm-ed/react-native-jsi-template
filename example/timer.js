import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';

export default function Timer() {
  const millisPassedRef = useRef(0);
  const [secondsPassed, setSecondsPassed] = useState(0);

  useEffect(() => {
    setInterval(() => {
      millisPassedRef.current += 100;
      setSecondsPassed(~~(millisPassedRef.current / 1000));
      console.log('Consoling...');
    }, 100);
  }, []);

  return (
    <View style={styles.root}>
      <Text>{secondsPassed}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
