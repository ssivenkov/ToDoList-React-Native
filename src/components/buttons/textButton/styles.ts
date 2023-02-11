import { COLORS } from '@colors/colors';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type TextButtonStylesType = {
  button: ViewStyle;
  text: TextStyle;
  touchableNativeFeedbackWrapper: ViewStyle;
};

const textButtonBorderRadius = 30;

export const textButtonStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<TextButtonStylesType>({
    button: {
      alignItems: 'center',
      backgroundColor: props.ACCENT_COLOR,
      borderRadius: textButtonBorderRadius,
      paddingHorizontal: 60,
      paddingVertical: 12,
    },

    text: {
      color: COLORS.WHITE,
      fontSize: 18,
    },

    touchableNativeFeedbackWrapper: {
      borderRadius: textButtonBorderRadius,
      overflow: 'hidden',
    },
  });
