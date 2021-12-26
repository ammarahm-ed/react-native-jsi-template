import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import jsi from 'react-native-jsi-template';

const benchmarks = [
  {
    name: 'Borwein',
    iterations: 1000,
    precision: 100,
    method: jsi.getOneByPi,
  },
  {
    name: 'GaussLegendre',
    iterations: 1000,
    precision: 100,
    method: jsi.gaussLegendre,
  },
  {
    name: 'RecursiveFactorial',
    iterations: 1000,
    precision: 15,
    method: jsi.factorial,
  },
];

const EMPTY_RESULT = {
  result: '',
  duration: '',
};

export default function App() {
  const [benchmarkResults, setBenchmarkResults] = useState({
    Borwein: {
      ...EMPTY_RESULT,
    },
    GaussLegendre: {
      ...EMPTY_RESULT,
    },
    RecursiveFactorial: {
      ...EMPTY_RESULT,
    },
  });
  const benchmarkResultsRef = useRef(benchmarkResults);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          onPress={() => {
            benchmarks.forEach(({method, name, iterations, precision}) => {
              const perfNow = performance.now();
              const result = method(precision);

              for (let i = 1; i < iterations; i++) {
                method(precision);
              }

              const _benchmarkResults = {...benchmarkResultsRef.current};
              _benchmarkResults[name] = {
                result,
                duration: performance.now() - perfNow,
              };
              benchmarkResultsRef.current = _benchmarkResults;
              setBenchmarkResults(_benchmarkResults);
            });
          }}
          style={styles.button}>
          <Text style={styles.buttonTxt}>Start benchmarks</Text>
        </TouchableOpacity>
        {benchmarks.map(({name, iterations, precision, method}, index) => (
          <View style={styles.item} key={name}>
            <Text style={styles.algo}>Algo: {name}</Text>
            <Text>Iterations: {iterations}</Text>
            <Text>Precision: {precision}</Text>

            <Text>Result: {benchmarkResults[name].result}</Text>
            <Text>Duration: {benchmarkResults[name].duration}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: '100%',
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
  item: {
    marginTop: 20,
    marginHorizontal: 20,
  },
});
