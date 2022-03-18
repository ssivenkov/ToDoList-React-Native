import {ReturnComponentType} from 'commonTypes/returnComponentType';
import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';

export const SignInScreen = (): ReturnComponentType => {
  return (
    <View>
      <Text style={styles.text}>SignIn content</Text>
    </View>
  );
};
