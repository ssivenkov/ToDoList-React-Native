import React from 'react';

import {
  modalMenuButtonDarkGradient,
  modalMenuButtonLightGradient,
} from '@colors/gradients';
import { useStyles } from '@hooks/useStyles';
import { themeSelector } from '@store/selectors/userSelectors';
import { Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

import { modalMenuButtonStyles } from './styles';
import { ModalMenuButtonPropsType } from './type';

export const ModalMenuButton = (props: ModalMenuButtonPropsType) => {
  const { title, onPress, disabled, rightRounding, leftRounding } = props;

  const styles = useStyles(modalMenuButtonStyles);

  const theme = useSelector(themeSelector);

  const modalMenuButtonGradientWrapperStyle = [
    styles.modalMenuButtonGradientWrapper,
    disabled && styles.modalMenuButtonDisabled,
    leftRounding && styles.leftBorderRadius,
    rightRounding && styles.rightBorderRadius,
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
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};