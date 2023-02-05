import React from 'react';

import { SmallLoaderPropsType } from '@components/loaders/smallLoader/types';
import LottieView from 'lottie-react-native';
import { View } from 'react-native';

import { styles } from './styles';

export const SmallLoader = (props: SmallLoaderPropsType) => {
  const { isDarkTheme } = props;

  if (isDarkTheme) {
    return (
      <View style={styles.smallLoaderContainer}>
        <LottieView
          autoPlay={true}
          source={require('../../../assets/images/lottieAnimations/white-loader.json')}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.smallLoaderContainer}>
        <LottieView
          autoPlay={true}
          source={require('../../../assets/images/lottieAnimations/black-loader.json')}
        />
      </View>
    );
  }
};
