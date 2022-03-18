import React from 'react';
import {TextInput, View} from 'react-native';
import {styles} from './styles';
import {InputPropsType} from './types';

export const Input = ({value, onValueChange}: InputPropsType) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={'...'}
        onChangeText={(text: string) => {
          onValueChange(text);
        }}
        defaultValue={value}
      />
    </View>
  );
};
