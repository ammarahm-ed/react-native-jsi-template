/* eslint-disable no-script-url */
/* eslint-disable no-undef */
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import jsi from 'react-native-jsi-template';
import Timer from './timer';

const ITERATATION_COUNT = 1000000;

function jsFactorial(n) {
  if (n > 1) return n * jsFactorial(n - 1);
  return 1;
}

function jsGaussLegendre(iterations) {
  let a = 1.0;
  let b = 1.0 / Math.sqrt(2);
  let t = 1.0 / 4.0;
  let p = 1.0;
  for (let i = 0; i < iterations; i++) {
    let aNext = (a + b) / 2;
    let bNext = Math.sqrt(a * b);
    let tNext = t - p * Math.pow(a - aNext, 2);
    let pNext = 2 * p;
    a = aNext;
    b = bNext;
    t = tNext;
    p = pNext;
  }
  return Math.pow(a + b, 2) / (4 * t);
}

function jsLoop(iterations) {
  for (let i = 0; i < iterations; i++) {}
  return iterations;
}

function jsGetOneByPi(k) {
  let ak = 6.0 - 4 * Math.sqrt(2);
  let yk = Math.sqrt(2) - 1.0;
  let ak1;
  let yk1;
  for (let i = 0; i < k; i++) {
    yk1 =
      (1 - Math.pow(1 - yk * yk * yk * yk, 0.25)) /
      (1 + Math.pow(1 - yk * yk * yk * yk, 0.25));
    ak1 =
      ak * Math.pow(1 + yk1, 4) -
      Math.pow(2, 2 * i + 3) * yk1 * (1 + yk1 + yk1 * yk1);
    yk = yk1;
    ak = ak1;
  }
  return ak;
}

export default function App() {
  const [resultsObj, setResultsObj] = useState({
    js: {duration: 0, result: 0},
    native: {duration: 0, result: 0},
  });
  return (
    <View style={styles.container}>
      <Text style={styles.algo}>
        Algo: Basic Loop (Iterations: {ITERATATION_COUNT})
      </Text>
      <Text style={styles.title}>Native:</Text>
      <Text>Result: {resultsObj.native.result}</Text>
      <Text>Duration: {resultsObj.native.duration}</Text>
      <Text style={styles.title}>JavaScript:</Text>
      <Text>Result: {resultsObj.js.result}</Text>
      <Text>Duration: {resultsObj.js.duration}</Text>
      <TouchableOpacity
        onPress={() => {
          const jsPerf = performance.now();
          const jsResValue = jsLoop(ITERATATION_COUNT);
          const jsPerfRes = performance.now() - jsPerf;

          const nativePerf = performance.now();
          const nativeResValue = jsi.loop(ITERATATION_COUNT);
          const nativePerfRes = performance.now() - nativePerf;

          setResultsObj({
            native: {
              duration: nativePerfRes,
              result: nativeResValue,
            },
            js: {
              duration: jsPerfRes,
              result: jsResValue,
            },
          });
        }}
        style={styles.button}>
        <Text style={styles.buttonTxt}>Start calculation</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  algo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    width: '95%',
    alignSelf: 'center',
    height: 40,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonTxt: {
    color: 'white',
  },
});
