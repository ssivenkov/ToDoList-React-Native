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
import { ModalMenuButtonVisualExamplePropsType } from './type';

export const ModalMenuButtonVisualExample = (
  props: ModalMenuButtonVisualExamplePropsType,
) => {
  const styles = useStyles(modalMenuButtonStyles);

  const defaultOkTextStyle = styles.text;

  const { title, disabled, okTextStyle = defaultOkTextStyle, textSize } = props;

  const theme = useSelector(themeSelector);

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
      <TouchableOpacity disabled={disabled} style={styles.modalMenuButton}>
        <Text style={[okTextStyle, { fontSize: textSize }]}>{title}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};
