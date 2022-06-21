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
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
      backgroundColor: props.TEXT_BUTTON_COLOR,
      justifyContent: 'center',
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
