import {COLORS} from '@colors/colors';
import React from 'react';
import {TextInput, View} from 'react-native';
import {styles} from './styles';
import {InputPropsType} from './types';

export const CustomInput = (props: InputPropsType) => {
  const {value, onValueChange, placeholder} = props;
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.SILVER_CHALICE}
        onChangeText={(text: string) => {
          onValueChange(text);
        }}
        value={value}
      />
    </View>
  );
};
