import { COLORS } from '@colors/colors';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type InputStylesType = {
  errorSubtext: TextStyle;
  input: TextStyle;
  inputContainer: ViewStyle;
  inputTopContainer: ViewStyle;
  notepadInput: TextStyle;
  subtext: TextStyle;
  suptext: TextStyle;
  transparentSubtext: TextStyle;
};

const { CRIMSON, TRANSPARENT } = COLORS;

const textWidth = '100%';
const subtextFontSize = 12.5;
const subtextPaddingVertical = 8;

export const inputStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<InputStylesType>({
    errorSubtext: {
      color: CRIMSON,
      fontSize: subtextFontSize,
      paddingVertical: subtextPaddingVertical,
      width: textWidth,
    },

    input: {
      alignContent: 'center',
      backgroundColor: props.PLACEHOLDER_COLOR,
      borderRadius: 8,
      color: props.TEXT_COLOR,
      fontSize: 18,
      lineHeight: 25,
      padding: 10,
      width: textWidth,
    },

    inputContainer: {
      flexDirection: 'row',
    },

    inputTopContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    notepadInput: {
      alignContent: 'center',
      backgroundColor: props.NOTEPAD_PLACEHOLDER_COLOR,
      color: props.TEXT_COLOR,
      fontSize: 16,
      lineHeight: 24,
      padding: 10,
      width: textWidth,
    },

    subtext: {
      color: props.SUBTEXT_COLOR,
      fontSize: subtextFontSize,
      paddingVertical: subtextPaddingVertical,
      width: textWidth,
    },

    suptext: {
      color: props.TEXT_COLOR,
      fontSize: 14,
      paddingVertical: 8,
    },

    transparentSubtext: {
      color: TRANSPARENT,
      fontSize: subtextFontSize,
      opacity: 0,
      paddingVertical: subtextPaddingVertical,
      width: textWidth,
    },
  });
