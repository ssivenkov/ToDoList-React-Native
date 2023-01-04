import { COLORS } from '@colors/colors';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type TextButtonStylesType = {
  touchableNativeFeedbackWrapper: ViewStyle;
  button: ViewStyle;
  text: TextStyle;
};

const textButtonBorderRadius = 30;

export const textButtonStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<TextButtonStylesType>({
    touchableNativeFeedbackWrapper: {
      borderRadius: textButtonBorderRadius,
      overflow: 'hidden',
    },

    button: {
      paddingHorizontal: 60,
      paddingVertical: 12,
      borderRadius: textButtonBorderRadius,
      backgroundColor: props.ACCENT_COLOR,
      alignItems: 'center',
    },

    text: {
      fontSize: 18,
      color: COLORS.WHITE,
    },
  });
