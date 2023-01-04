import { COLORS } from '@colors/colors';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type TextButtonStylesType = {
  button: ViewStyle;
  text: TextStyle;
};

export const textButtonStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<TextButtonStylesType>({
    button: {
      paddingHorizontal: 60,
      paddingVertical: 12,
      borderRadius: 30,
      backgroundColor: props.ACCENT_COLOR,
      alignItems: 'center',
    },

    text: {
      fontSize: 18,
      color: COLORS.WHITE,
    },
  });
