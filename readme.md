# React Native QR Code Scanner POC

This POC demonstrates how to open a scanner, read a QR code, extract information from it, and decide what to do with that information.

## Sibling projects

* This POC is the React Native version of the [HTML5 QR code scanner POC](https://github.com/schonarth/html5-qrcode-scanner-poc) I built to do the same thing on a browser.

* Also, go to https://schonarth.github.io/react-qrcode-deep-link to generate *deferred deep link* QR codes that send users to the app if read from a regular mobile camera app. Scanning those with this app extracts the parameters so you can stay in-app.

## Installing

Check out this repository into a folder and run ```yarn``` or ```npm install``` to install the dependencies, then run one of the ```package.json``` scripts to start the app on Expo.

The app functionality is self-explained in the ```src/App.js``` and ```src/Scanner.jsx``` files.

## Using

Once the app is running on your mobile or emulator:

* Toggle the **Scanner ON** switch to begin
* The scanner supports several different formats:
  * 1D barcode (several standards)
  * QR code
  * If the code contains a URL, you can use it to start navigation.
  * [Deferred deep link](https://schonarth.github.io/react-qrcode-deep-link) codes contain an URL that behave according to the scenario:
    * When scanned with a smartphone camera app, it will either
      * Open the app if installed, passing included parameters, or
      * Send users to either App Store or Google Play Store, depending on their device, to install the app.
    * When scanned with this app, included parameters can be extracted and used immediately, no need to navigate away.

## About the ViewPropTypes issue

This POC relies on ```react-native-camera```, which uses a deprecated React Native API. Currently there's no **good** solution but a workaround that gets the job done:

* Follow the instructions [here](https://github.com/react-native-camera/react-native-camera/issues/3423#issuecomment-1185692205). It involves editing a file within ```node_modules``` -- told you it ain't *good*.

[There's a PR to fix it](https://github.com/react-native-camera/react-native-camera/pull/3429/files), but since the component has fallen out of maintenance, who knows when it will be merged.

Alternatively, that camera library could be replaced by [React Native Vision Camera](https://www.npmjs.com/package/react-native-vision-camera), but that also depends on the [React Native QRCode Scanner](https://github.com/moaazsidat/react-native-qrcode-scanner) library to implement.

This is a very recent issue, though (as of Sep 2022). It might get fixed soon.