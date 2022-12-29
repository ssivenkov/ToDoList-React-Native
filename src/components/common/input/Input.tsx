import React from 'react';

import { COLORS } from '@colors/colors';
import { MAX_INPUT_LENGTH } from '@constants/constants';
import { useStyles } from '@root/hooks/useStyles';
import { TextInput, View } from 'react-native';

import { styles } from './styles';
import { InputPropsType } from './types';

export const Input = (props: InputPropsType) => {
  const { value, onValueChange, placeholder, inputRef } = props;

  const style = useStyles(styles);

  return (
    <View style={style.inputContainer}>
      <TextInput
        maxLength={MAX_INPUT_LENGTH}
        onChangeText={(text: string) => {
          onValueChange(text);
        }}
        placeholder={placeholder}
        placeholderTextColor={COLORS.SILVER_CHALICE2}
        ref={inputRef}
        style={style.input}
        value={value}
      />
    </View>
  );
};
