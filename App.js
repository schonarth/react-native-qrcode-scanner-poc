import { StatusBar } from 'expo-status-bar';
import Scanner from './Scanner';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Switch } from 'react-native';

export default function App() {
  const emptyRead = 'Your result will appear here';
  const [scanData, setScanData] = React.useState(undefined);
  const [scannerOn, setScannerOn] = React.useState(true);

  const handleScan = (data) => {
    console.log(data);
    setScanData(data);
  };

  const handlePress = () => {
    setScannerOn(!scannerOn);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      {scannerOn && (
        <Scanner
          style={{ flex: 1 }}
          onScan={handleScan}
          reactivateTimeout={1000}
        />
      )}
      <View style={styles.bottom}>
        <View style={styles.readOutput}>
          <Text style={!!scanData && styles.readOutField}>
            {scanData || emptyRead}
          </Text>
        </View>
        <View style={styles.switch}>
          <Text>Camera on</Text>
          <Switch value={scannerOn} onValueChange={handlePress} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    flex: 0.1,
    flexDirection: 'row',
  },
  readOutput: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  readOutField: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
  },
  switch: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});
