'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

class Scanner extends Component {
  constructor() {
    super();
    this.cameraIcons = {
      front: '💻',
      back: '🎮',
    };

    this.state = {
      currentCamera:
        this.props?.camera?.toLowerCase() === 'front' ? 'front' : 'back',
    };
  }

  switchCameras() {
    this.setState({
      currentCamera: this.state.currentCamera === 'front' ? 'back' : 'front',
    });
    console.log('Switching cameras:', this.state.currentCamera);
  }

  onSuccess(e) {
    if (e.data?.startsWith('http')) {
      Alert.alert('URL found', `Open ${e.data} in browser?`, [
        {
          text: 'Yes',
          onPress: () =>
            Linking.openURL(e.data).catch((err) =>
              console.error('An error occured', err)
            ),
        },
        {
          text: 'No',
          onPress: () => console.log('No pressed'),
          style: 'cancel',
        },
      ]);
    }
    if (this.props.onScan) this.props.onScan(e.data);
  }

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        showMarker
        reactivate
        reactivateTimeout={this.props.reactivateTimeout || 5000}
        cameraType={this.state.currentCamera}
        // topContent={
        //   <Text style={styles.centerText}>
        //     Go to{' '}
        //     <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
        //     your computer and scan the QR code.
        //   </Text>
        // }
        bottomContent={
          <TouchableOpacity
            style={styles.buttonTouchable}
            onPress={this.switchCameras.bind(this)}
          >
            <Text style={styles.buttonText}>
              {this.cameraIcons[this.state.currentCamera]} Switch cameras
            </Text>
          </TouchableOpacity>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
    backgroundColor: '#fff9',
    borderRadius: 10,
    marginBottom: 40,
  },
});

export default Scanner;
AppRegistry.registerComponent('Scanner', () => Scanner);
