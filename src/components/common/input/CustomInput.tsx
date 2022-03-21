import React from 'react';
import {TextInput, View} from 'react-native';
import {COLORS} from '../../../colors/colors';
import {styles} from './styles';
import {InputPropsType} from './types';

export const CustomInput = (props: InputPropsType) => {
  const {
    value,
    onValueChange,
    onBlur,
    placeholder,
    keyboardType,
    secureTextEntry,
  } = props;
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray}
        onChangeText={(text: string) => {
          onValueChange(text);
        }}
        onBlur={onBlur}
        defaultValue={value}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};
