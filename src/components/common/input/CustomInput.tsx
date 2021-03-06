import React from 'react';

import { COLORS } from '@colors/colors';
import { useStyles } from '@root/hooks/useStyles';
import { TextInput, View } from 'react-native';

import { styles } from './styles';
import { InputPropsType } from './types';

export const CustomInput = (props: InputPropsType) => {
  const { value, onValueChange, placeholder } = props;

  const style = useStyles(styles);

  return (
    <View style={style.container}>
      <TextInput
        maxLength={100}
        onChangeText={(text: string) => {
          onValueChange(text);
        }}
        placeholder={placeholder}
        placeholderTextColor={COLORS.SILVER_CHALICE1}
        style={style.input}
        value={value}
      />
    </View>
  );
};
