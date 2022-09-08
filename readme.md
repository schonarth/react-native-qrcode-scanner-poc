### How to fix the ViewPropTypes issue

This POC relies on ```react-native-camera```, which uses some deprecated React Native stuff. First thing I tried was to revert to an older version of React Native, but the whole thing would not build, so the alternative is to go and fix the dependency until they implement it themselves.

Follow the instructions [here](https://github.com/react-native-camera/react-native-camera/issues/3423#issuecomment-1185692205) to fix it if it still doesn't work.