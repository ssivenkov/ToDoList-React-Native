import { COLORS } from '@colors/colors';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type ModalMenuButtonStylesType = {
  modalMenuButton: ViewStyle;
  modalMenuButtonDisabled: ViewStyle;
  modalMenuButtonGradientWrapper: ViewStyle;
  separator: ViewStyle;
  text: TextStyle;
};

export const modalMenuButtonStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<ModalMenuButtonStylesType>({
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

    separator: {
      backgroundColor: props.darkMode ? COLORS.WOODSMOKE3 : COLORS.WHITE,
      width: 1,
    },

    text: {
      color: props.TEXT_COLOR,
      marginBottom: 2,
      paddingHorizontal: 10,
      textAlign: 'center',
    },
  });
