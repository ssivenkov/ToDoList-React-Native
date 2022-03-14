import {CustomIconButtonPropsType} from 'components/common/buttons/Type';
import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {ReturnComponentType} from 'types/common/ReturnComponentType';
import {styles} from './Styles';

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
