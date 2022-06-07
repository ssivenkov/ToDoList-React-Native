import {styles} from '@components/common/buttons/textButton/styles';
import {TextButtonPropsType} from '@components/common/buttons/textButton/type';
import {useStyles} from '@root/hooks/useStyles';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

export const TextButton = (props: TextButtonPropsType) => {
  const {title, containerStyle, onPress, disable} = props;
  const style = useStyles(styles);

  const TextButtonStyle = [
    style.textButton,
    disable && style.textButtonDisable,
  ];

  return (
    <View style={containerStyle && containerStyle}>
      <TouchableOpacity
        onPress={onPress}
        style={TextButtonStyle}
        disabled={disable}>
        <Text style={style.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
