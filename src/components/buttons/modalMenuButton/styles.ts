import { COLORS } from '@colors/colors';
import { modalBorderRadius } from '@components/modals/modalStyles';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type ModalMenuButtonStylesType = {
  modalMenuButtonGradientWrapper: ViewStyle;
  modalMenuButton: ViewStyle;
  modalMenuButtonDisabled: ViewStyle;
  leftBorderRadius: ViewStyle;
  rightBorderRadius: ViewStyle;
  text: TextStyle;
  separator: ViewStyle;
};

export const modalMenuButtonStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<ModalMenuButtonStylesType>({
    modalMenuButtonGradientWrapper: {
      flex: 1,
    },

    modalMenuButton: {
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
    },

    modalMenuButtonDisabled: {
      opacity: 0.2,
    },

    leftBorderRadius: {
      borderBottomLeftRadius: modalBorderRadius,
    },

    rightBorderRadius: {
      borderBottomRightRadius: modalBorderRadius,
    },

    text: {
      fontSize: 20,
      color: props.TEXT_COLOR,
      marginBottom: 2,
      paddingHorizontal: 10,
    },

    separator: {
      width: 1,
      backgroundColor: props.darkMode ? COLORS.WOODSMOKE : COLORS.WHITE,
    },
  });
