import {styles} from '@components/common/loader/styles';
import {useStyles} from '@root/hooks/useStyles';
import LottieView from 'lottie-react-native';
import React from 'react';
import {StyleSheet, View} from 'react-native';

export const Loader = () => {
  const style = useStyles(styles);

  return (
    <View style={[StyleSheet.absoluteFillObject, style.loaderContainer]}>
      <LottieView
        autoPlay
        source={require('../../../assets/images/loader.json')}
      />
    </View>
  );
};
