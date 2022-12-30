import React from 'react';

import { IconButtonPropsType } from '@components/common/buttons/iconButton/type';
import { TouchableOpacity } from 'react-native';

import { styles } from './styles';

export const IconButton = (props: IconButtonPropsType) => {
  const { icon, onPress, disable = false } = props;

  return (
    <TouchableOpacity
      disabled={disable}
      onPress={onPress}
      style={disable ? styles.iconDisable : styles.icon}
    >
      {icon}
    </TouchableOpacity>
  );
};
