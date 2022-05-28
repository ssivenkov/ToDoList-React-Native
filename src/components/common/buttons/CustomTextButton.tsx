import {CustomTextButtonPropsType} from '@components/common/buttons/type';
import {useStyles} from '@root/hooks/useStyles';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

export const CustomTextButton = (props: CustomTextButtonPropsType) => {
  const {title, containerStyle, onPress, disable} = props;
  const style = useStyles(styles);

  const CustomTextButtonStyle = [
    style.textButton,
    disable && style.textButtonDisable,
  ];

  return (
    <View style={containerStyle && containerStyle}>
      <TouchableOpacity
        onPress={onPress}
        style={CustomTextButtonStyle}
        disabled={disable}>
        <Text style={style.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
