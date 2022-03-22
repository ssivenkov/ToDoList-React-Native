import {CustomTextButtonPropsType} from '@components/common/buttons/type';
import React, {FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';

export const CustomTextButton: FC<CustomTextButtonPropsType> = (props) => {
  const {title, onPress, disable} = props;
  const CustomTextButtonStyle = [
    styles.textButton,
    disable && styles.textButtonDisable,
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={CustomTextButtonStyle}
      disabled={disable}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};
