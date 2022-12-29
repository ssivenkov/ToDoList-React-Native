import { COLORS } from '@colors/colors';
import { ExtendedStylesPropsType } from '@root/hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type InputStylesType = {
  inputContainer: ViewStyle;
  input: TextStyle;
  suptext: TextStyle;
  subtext: TextStyle;
  errorSubtext: TextStyle;
  transparentText: TextStyle;
};

const subtextWidth = '100%';
const subtextFontSize = 12.5;
const subtextPaddingVertical = 8;

export const styles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<InputStylesType>({
    inputContainer: {
      flexDirection: 'row',
    },

    input: {
      width: '100%',
      alignContent: 'center',
      fontSize: 18,
      padding: 10,
      color: props.TEXT_COLOR,
      backgroundColor: props.PLACEHOLDER_COLOR,
      borderRadius: 8,
    },

    suptext: {
      width: '100%',
      fontSize: 14,
      paddingVertical: 8,
      color: props.TEXT_COLOR,
    },

    subtext: {
      width: subtextWidth,
      fontSize: subtextFontSize,
      paddingVertical: subtextPaddingVertical,
      color: props.SUBTEXT_COLOR,
    },

    errorSubtext: {
      width: subtextWidth,
      fontSize: subtextFontSize,
      paddingVertical: subtextPaddingVertical,
      color: COLORS.CRIMSON,
    },

    transparentText: {
      width: subtextWidth,
      fontSize: subtextFontSize,
      paddingVertical: subtextPaddingVertical,
      opacity: 0,
    },
  });
