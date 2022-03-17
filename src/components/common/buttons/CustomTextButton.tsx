import {CustomTextButtonPropsType} from 'components/common/buttons/type';
import React, {FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {ReturnComponentType} from 'types/common/returnComponentType';
import {styles} from './styles';

export const CustomTextButton: FC<CustomTextButtonPropsType> = (props) => {
  const {title, onPress} = props;

  return (
    <TouchableOpacity onPress={onPress} style={styles.textButton}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};
