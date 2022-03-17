import React from 'react';
import {Text, View} from 'react-native';
import {ReturnComponentType} from 'types/common/returnComponentType';
import {styles} from './styles';

export const SignInScreen = (): ReturnComponentType => {
  return (
    <View>
      <Text style={styles.text}>SignIn content</Text>
    </View>
  );
};
