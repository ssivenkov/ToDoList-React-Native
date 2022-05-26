import {styles} from '@components/common/loader/styles';
import {themeSelector} from '@store/selectors/userSelectors';
import LottieView from 'lottie-react-native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

export const Loader = () => {
  const theme = useSelector(themeSelector);

  return (
    <View
      style={[StyleSheet.absoluteFillObject, styles(theme).loaderContainer]}>
      <LottieView
        autoPlay
        source={require('../../../assets/images/loader.json')}
      />
    </View>
  );
};
