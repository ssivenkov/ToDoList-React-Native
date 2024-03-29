import React from 'react';

import { commonButtonStyles } from '@components/buttons/commonButtonStyles';
import { TouchableOpacity } from 'react-native';

import { styles } from './styles';
import { IconButtonPropsType } from './type';

export const IconButton = (props: IconButtonPropsType) => {
  const { icon, onPress, disabled = false, padding } = props;

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        disabled ? commonButtonStyles.disabled : styles.icon,
        { padding: padding ?? 0 },
      ]}
    >
      {icon}
    </TouchableOpacity>
  );
};
