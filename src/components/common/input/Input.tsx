import React from 'react';
import {TextInput, View} from 'react-native';
import {styles} from './Styles';
import {InputPropsType} from './Types';

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
