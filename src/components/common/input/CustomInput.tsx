import {COLORS} from '@colors/colors';
import {useStyles} from '@root/hooks/useStyles';
import React from 'react';
import {TextInput, View} from 'react-native';
import {styles} from './styles';
import {InputPropsType} from './types';

export const CustomInput = (props: InputPropsType) => {
  const {value, onValueChange, placeholder} = props;

  const style = useStyles(styles);

  return (
    <View style={style.container}>
      <TextInput
        style={style.input}
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
