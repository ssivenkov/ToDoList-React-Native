import React from 'react';

import { IconButtonPropsType } from '@components/common/buttons/iconButton/type';
import { TouchableOpacity } from 'react-native';

import { styles } from './styles';

export const IconButton = (props: IconButtonPropsType) => {
  const { icon, onPress, disable } = props;

  return (
    <TouchableOpacity disabled={disable} onPress={onPress} style={styles.icon}>
      {icon}
    </TouchableOpacity>
  );
};
