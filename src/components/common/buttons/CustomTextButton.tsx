import {CustomTextButtonPropsType} from 'components/common/buttons/Type';
import React, {FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {ReturnComponentType} from 'types/common/ReturnComponentType';
import {styles} from './Styles';

export const CustomTextButton: FC<CustomTextButtonPropsType> = (
  props,
): ReturnComponentType => {
  const {title, onPress} = props;

  return (
    <TouchableOpacity onPress={onPress} style={styles.textButton}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};
