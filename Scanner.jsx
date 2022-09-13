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
      front: '🤳',
      back: '📷',
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
    if (this.props.onScan && e?.data) this.props.onScan(e.data);
  }

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        showMarker
        reactivate
        reactivateTimeout={this.props.reactivateTimeout || 5000}
        cameraType={this.state.currentCamera}
        topContent={<Text style={styles.centerText}>Loading scanner...</Text>}
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
    padding: 20,
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
    padding: 10,
    backgroundColor: '#fffc',
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default Scanner;
AppRegistry.registerComponent('Scanner', () => Scanner);
