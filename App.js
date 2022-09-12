import { StatusBar } from 'expo-status-bar';
import Scanner from './Scanner';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Switch,
  Linking,
} from 'react-native';

export default function App() {
  const APP_URL = 'schonarth.github.io';
  const DEEP_LINK_URL = 'https://schonarth.github.io/react-qrcode-deep-link';
  const emptyRead = 'Your result will appear here';
  const [scanData, setScanData] = useState(undefined);
  const [scannerOn, setScannerOn] = useState(false);

  /**
   * This is the parameter extracted from the QR code.
   * When scanned from the app, you can skip visiting the website
   * and go straight to the action it's supposed to initiate.
   * When scanned from the website, you will be redirected to the app.
   * This example contains one parameter; you can have as many as you want.
   */
  const [qrCodeQuery, setQrCodeQuery] = useState(undefined);

  const isUrl = () => {
    return !!scanData && scanData.startsWith('http');
  };

  const handleScan = (data) => {
    setScanData(data);
    setQrCodeQuery(processQR(data));
  };

  /**
   * This function processes the QR code data and extracts the app parameter(s).
   * It only works if the QR code contains the app URL (other checks can be added).
   */
  const processQR = (qrCode) =>
    qrCode?.includes(APP_URL)
      ? new URLSearchParams(qrCode.substring(qrCode.indexOf('?'))).get('query')
      : undefined;

  const toggleScanner = () => {
    setScannerOn(!scannerOn);
  };

  function handleUrlClick() {
    gotoUrl(scanData);
  }

  function gotoDeepLinkGenerator() {
    gotoUrl(DEEP_LINK_URL);
  }

  function gotoUrl(url) {
    Linking.openURL(url).catch((err) =>
      console.error(`An error occurred opening ${url}`, err)
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.cameraPlaceholder}>
        {(scannerOn && (
          <Scanner
            style={{ flex: 1 }}
            onScan={handleScan}
            reactivateTimeout={1000}
          />
        )) || (
          <>
            <Text>Turn on the scanner to scan a QR code.</Text>
            <Text style={styles.link} onPress={gotoDeepLinkGenerator}>
              Get actionable QR codes here
            </Text>
            <Text>(best to open that in another device 😉)</Text>
          </>
        )}
      </View>
      <View style={styles.bottom}>
        <View style={styles.readOutput}>
          {isUrl() ? (
            <Text style={styles.link} onPress={handleUrlClick}>
              {scanData}
            </Text>
          ) : (
            <Text style={!!scanData && styles.readOutField}>
              {scanData || emptyRead}
            </Text>
          )}
          {qrCodeQuery && <Text>Query: {qrCodeQuery}</Text>}
        </View>
        <View style={styles.switch}>
          <Text>Camera on</Text>
          <Switch value={scannerOn} onValueChange={toggleScanner} />
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
    flex: 0.2,
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
  cameraPlaceholder: {
    flex: 1,
    backgroundColor: 'lightgrey',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  link: {
    color: 'blue',
    border: 'none',
    backgroundColor: 'transparent',
    textTransform: 'none',
    textDecorationLine: 'underline',
  },
});
