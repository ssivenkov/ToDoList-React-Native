import { COLORS } from '@colors/colors';
import { modalBorderRadius } from '@constants/constants';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type ModalMenuButtonStylesType = {
  leftBorderRadius: ViewStyle;
  modalMenuButton: ViewStyle;
  modalMenuButtonDisabled: ViewStyle;
  modalMenuButtonGradientWrapper: ViewStyle;
  rightBorderRadius: ViewStyle;
  separator: ViewStyle;
  text: TextStyle;
};

export const modalMenuButtonStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<ModalMenuButtonStylesType>({
    leftBorderRadius: {
      borderBottomLeftRadius: modalBorderRadius,
    },

    modalMenuButton: {
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center',
      padding: 10,
    },

    modalMenuButtonDisabled: {
      opacity: 0.2,
    },

    modalMenuButtonGradientWrapper: {
      flex: 1,
    },

    rightBorderRadius: {
      borderBottomRightRadius: modalBorderRadius,
    },

    separator: {
      backgroundColor: props.darkMode ? COLORS.WOODSMOKE3 : COLORS.WHITE,
      width: 1,
    },

    text: {
      color: props.TEXT_COLOR,
      fontSize: 20,
      marginBottom: 2,
      paddingHorizontal: 10,
      textAlign: 'center',
    },
  });
