import React from 'react';

import { commonButtonStyles } from '@components/buttons/commonButtonStyles';
import { useStyles } from '@hooks/useStyles';
import { Text, TouchableOpacity, View } from 'react-native';

import { textButtonStyles } from './styles';
import { TextButtonPropsType } from './type';

export const TextButton = (props: TextButtonPropsType) => {
  const { title, containerStyle, onPress, disabled } = props;

  const style = useStyles(textButtonStyles);

  const TextButtonStyle = [style.button, disabled && commonButtonStyles.disabled];

  return (
    <View style={containerStyle && containerStyle}>
      <TouchableOpacity disabled={disabled} onPress={onPress} style={TextButtonStyle}>
        <Text style={style.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
