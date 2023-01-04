import React from 'react';

import LottieView from 'lottie-react-native';
import { StyleSheet, View } from 'react-native';

import { styles } from './styles';

export const Loader = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.loaderContainer]}>
      <LottieView autoPlay={true} source={require('../../assets/images/loader.json')} />
    </View>
  );
};
