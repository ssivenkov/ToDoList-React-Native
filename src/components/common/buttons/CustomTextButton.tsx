import {CustomTextButtonPropsType} from '@components/common/buttons/type';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

export const CustomTextButton = (props: CustomTextButtonPropsType) => {
  const {title, containerStyle, onPress, disable} = props;

  const CustomTextButtonStyle = [
    styles.textButton,
    disable && styles.textButtonDisable,
  ];

  return (
    <View style={containerStyle && containerStyle}>
      <TouchableOpacity
        onPress={onPress}
        style={CustomTextButtonStyle}
        disabled={disable}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
