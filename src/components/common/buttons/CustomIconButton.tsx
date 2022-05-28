import {CustomIconButtonPropsType} from '@components/common/buttons/type';
import {useStyles} from '@root/hooks/useStyles';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {styles} from './styles';

export const CustomIconButton = (props: CustomIconButtonPropsType) => {
  const {icon, onPress, disable} = props;

  const style = useStyles(styles);

  return (
    <TouchableOpacity style={style.icon} onPress={onPress} disabled={disable}>
      {icon}
    </TouchableOpacity>
  );
};
