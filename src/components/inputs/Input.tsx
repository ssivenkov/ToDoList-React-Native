import React from 'react';

import { COLORS } from '@colors/colors';
import { useStyles } from '@hooks/useStyles';
import { TextInput, View } from 'react-native';

import { inputStyles } from './styles';
import { InputPropsType } from './types';

export const Input = (props: InputPropsType) => {
  const { value, onValueChange, maxLength, placeholder, inputRef } = props;

  const styles = useStyles(inputStyles);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        maxLength={maxLength}
        onChangeText={(text: string) => {
          onValueChange(text);
        }}
        placeholder={placeholder}
        placeholderTextColor={COLORS.SILVER_CHALICE2}
        ref={inputRef}
        style={styles.input}
        value={value}
      />
    </View>
  );
};
