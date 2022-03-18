import {ReturnComponentType} from 'commonTypes/returnComponentType';
import {CustomIconButtonPropsType} from 'components/common/buttons/type';
import React, {FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';

export const CustomIconButton: FC<CustomIconButtonPropsType> = (
  props,
): ReturnComponentType => {
  const {icon, onPress} = props;

  return (
    <TouchableOpacity style={[styles.icon]} onPress={onPress}>
      <Text style={{color: '#fff'}}>{icon}</Text>
    </TouchableOpacity>
  );
};
