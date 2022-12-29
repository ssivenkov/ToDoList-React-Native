import { COLORS } from '@colors/colors';
import { ExtendedStylesPropsType } from '@root/hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type TextButtonStylesType = {
  textButton: ViewStyle;
  textButtonDisable: ViewStyle;
  text: TextStyle;
};

export const styles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<TextButtonStylesType>({
    textButton: {
      paddingHorizontal: 60,
      paddingVertical: 12,
      borderRadius: 30,
      backgroundColor: props.ACCENT_COLOR,
      alignItems: 'center',
    },

    textButtonDisable: {
      opacity: 0.3,
    },

    text: {
      fontSize: 18,
      color: COLORS.WHITE,
    },
  });
