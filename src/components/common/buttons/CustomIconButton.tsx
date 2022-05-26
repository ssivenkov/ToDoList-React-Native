import {CustomIconButtonPropsType} from '@components/common/buttons/type';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {styles} from './styles';

export const CustomIconButton = (props: CustomIconButtonPropsType) => {
  const {icon, onPress, disable} = props;

  return (
    <TouchableOpacity
      style={styles().icon}
      onPress={onPress}
      disabled={disable}>
      {icon}
    </TouchableOpacity>
  );
};
