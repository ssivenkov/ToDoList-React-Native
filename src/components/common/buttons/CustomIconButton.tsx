import {CustomIconButtonPropsType} from '@components/common/buttons/type';
import React, {FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';

export const CustomIconButton: FC<CustomIconButtonPropsType> = (props) => {
  const {icon, onPress, disable} = props;

  return (
    <TouchableOpacity style={styles.icon} onPress={onPress} disabled={disable}>
      <Text style={styles.text}>{icon}</Text>
    </TouchableOpacity>
  );
};
