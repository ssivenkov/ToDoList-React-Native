import {CustomIconButtonPropsType} from 'components/common/buttons/type';
import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {ReturnComponentType} from 'types/common/returnComponentType';
import {styles} from './styles';

export const CustomIconButton: FC<CustomIconButtonPropsType> = (
  props,
): ReturnComponentType => {
  const {icon, onPress} = props;

  return (
    <TouchableOpacity style={styles.icon} onPress={onPress}>
      {icon}
    </TouchableOpacity>
  );
};
