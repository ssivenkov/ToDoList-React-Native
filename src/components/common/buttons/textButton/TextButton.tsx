import React from 'react';

import { styles } from '@components/common/buttons/textButton/styles';
import { TextButtonPropsType } from '@components/common/buttons/textButton/type';
import { useStyles } from '@root/hooks/useStyles';
import { Text, TouchableOpacity, View } from 'react-native';

export const TextButton = (props: TextButtonPropsType) => {
  const { title, containerStyle, onPress, disabled } = props;
  const style = useStyles(styles);

  const TextButtonStyle = [style.textButton, disabled && style.textButtonDisable];

  return (
    <View style={containerStyle && containerStyle}>
      <TouchableOpacity disabled={disabled} onPress={onPress} style={TextButtonStyle}>
        <Text style={style.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
