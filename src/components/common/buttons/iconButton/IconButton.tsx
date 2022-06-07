import {IconButtonPropsType} from '@components/common/buttons/iconButton/type';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {styles} from './styles';

export const IconButton = (props: IconButtonPropsType) => {
  const {icon, onPress, disable} = props;

  return (
    <TouchableOpacity style={styles.icon} onPress={onPress} disabled={disable}>
      {icon}
    </TouchableOpacity>
  );
};
