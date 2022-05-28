import {styles} from '@components/common/loader/styles';
import LottieView from 'lottie-react-native';
import React from 'react';
import {StyleSheet, View} from 'react-native';

export const Loader = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.loaderContainer]}>
      <LottieView
        autoPlay
        source={require('../../../assets/images/loader.json')}
      />
    </View>
  );
};
