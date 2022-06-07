import {COLORS} from '@colors/colors';
import {modalBorderRadius} from '@components/common/modals/styles';
import {ExtendedStylesPropsType} from '@root/hooks/useStyles';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type ModalMenuButtonStylesType = {
  modalMenuButton: ViewStyle;
  modalMenuButtonDisable: ViewStyle;
  leftBorderRadius: ViewStyle;
  rightBorderRadius: ViewStyle;
  text: TextStyle;
  separator: ViewStyle;
};

export const styles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<ModalMenuButtonStylesType>({
    modalMenuButton: {
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 15,
    },

    modalMenuButtonDisable: {
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
      width: 1.5,
      backgroundColor: props.darkMode ? COLORS.WOODSMOKE2 : COLORS.WHITE,
    },
  });
