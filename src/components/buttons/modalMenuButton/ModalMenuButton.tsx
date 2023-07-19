import React from 'react';

import {
  modalMenuButtonDarkGradient,
  modalMenuButtonLightGradient,
} from '@colors/gradients';
import { useStyles } from '@hooks/useStyles';
import {
  modalButtonTextSizeSelector,
  themeSelector,
} from '@store/selectors/userSelectors';
import { Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

import { modalMenuButtonStyles } from './styles';
import { ModalMenuButtonPropsType } from './type';

export const ModalMenuButton = (props: ModalMenuButtonPropsType) => {
  const styles = useStyles(modalMenuButtonStyles);

  const defaultOkTextStyle = styles.text;

  const { title, onPress, disabled, okTextStyle = defaultOkTextStyle } = props;

  const theme = useSelector(themeSelector);
  const modalButtonTextSize = useSelector(modalButtonTextSizeSelector);

  const modalMenuButtonGradientWrapperStyle = [
    styles.modalMenuButtonGradientWrapper,
    disabled && styles.modalMenuButtonDisabled,
  ];

  const modalMenuButtonGradient = theme.darkMode
    ? modalMenuButtonDarkGradient
    : modalMenuButtonLightGradient;

  return (
    <LinearGradient
      colors={modalMenuButtonGradient}
      style={modalMenuButtonGradientWrapperStyle}
    >
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={styles.modalMenuButton}
      >
        <Text style={[okTextStyle, { fontSize: modalButtonTextSize }]}>{title}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};
