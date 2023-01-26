import { COLORS } from '@colors/colors';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type InputStylesType = {
  inputContainer: ViewStyle;
  input: TextStyle;
  notepadInput: TextStyle;
  suptext: TextStyle;
  subtext: TextStyle;
  errorSubtext: TextStyle;
  transparentSubtext: TextStyle;
};

const { CRIMSON, TRANSPARENT } = COLORS;

const textWidth = '100%';
const subtextFontSize = 12.5;
const subtextPaddingVertical = 8;

export const inputStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<InputStylesType>({
    inputContainer: {
      flexDirection: 'row',
    },

    input: {
      width: textWidth,
      alignContent: 'center',
      fontSize: 18,
      padding: 10,
      lineHeight: 25,
      color: props.TEXT_COLOR,
      backgroundColor: props.PLACEHOLDER_COLOR,
      borderRadius: 8,
    },

    notepadInput: {
      width: textWidth,
      alignContent: 'center',
      fontSize: 16,
      padding: 10,
      lineHeight: 24,
      color: props.TEXT_COLOR,
      backgroundColor: props.NOTEPAD_PLACEHOLDER_COLOR,
    },

    suptext: {
      width: textWidth,
      fontSize: 14,
      paddingVertical: 8,
      color: props.TEXT_COLOR,
    },

    subtext: {
      width: textWidth,
      fontSize: subtextFontSize,
      paddingVertical: subtextPaddingVertical,
      color: props.SUBTEXT_COLOR,
    },

    errorSubtext: {
      width: textWidth,
      fontSize: subtextFontSize,
      paddingVertical: subtextPaddingVertical,
      color: CRIMSON,
    },

    transparentSubtext: {
      width: textWidth,
      fontSize: subtextFontSize,
      paddingVertical: subtextPaddingVertical,
      color: TRANSPARENT,
      opacity: 0,
    },
  });
