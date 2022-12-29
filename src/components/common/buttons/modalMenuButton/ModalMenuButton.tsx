import React from 'react';

import {
  modalMenuButtonDarkGradient,
  modalMenuButtonLightGradient,
} from '@colors/gradients';
import { ModalMenuButtonPropsType } from '@components/common/buttons/modalMenuButton/type';
import { useStyles } from '@root/hooks/useStyles';
import { themeSelector } from '@store/selectors/userSelectors';
import { Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

import { styles } from './styles';

export const ModalMenuButton = (props: ModalMenuButtonPropsType) => {
  const { title, onPress, disable, rightRounding, leftRounding } = props;

  const style = useStyles(styles);

  const theme = useSelector(themeSelector);

  const buttonStyle = [
    { flex: 1 },
    disable && style.modalMenuButtonDisable,
    leftRounding && style.leftBorderRadius,
    rightRounding && style.rightBorderRadius,
  ];

  const modalMenuButtonGradient = theme.darkMode
    ? modalMenuButtonDarkGradient
    : modalMenuButtonLightGradient;

  return (
    <LinearGradient colors={modalMenuButtonGradient} style={buttonStyle}>
      <TouchableOpacity
        disabled={disable}
        onPress={onPress}
        style={style.modalMenuButton}
      >
        <Text style={style.text}>{title}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};
