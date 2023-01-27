import { COLORS } from '@colors/colors';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type TaskStylesType = {
  buttonsContainer: ViewStyle;
  colorMark: ViewStyle;
  container: ViewStyle;
  greenHighlightTask: TextStyle;
  redHighlightTask: TextStyle;
  text: TextStyle;
  warnText: TextStyle;
};

const { RED, DUSTY_GRAY } = COLORS;

const textSize = 18;

const taskContainerBorderRadius = 7;

export const taskStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<TaskStylesType>({
    buttonsContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      width: '100%',
    },

    colorMark: {
      height: '100%',
      width: 6,
    },

    container: {
      backgroundColor: props.TASK_COLOR,
      borderRadius: taskContainerBorderRadius,
      marginVertical: 3,
      overflow: 'hidden',
    },

    greenHighlightTask: {
      color: DUSTY_GRAY,
      fontWeight: '500',
    },

    redHighlightTask: {
      color: RED,
      fontWeight: '500',
    },

    text: {
      color: props.TEXT_COLOR,
      flex: 1,
      fontSize: textSize,
      paddingLeft: 7,
      paddingVertical: 4,
    },

    warnText: {
      fontSize: textSize,
    },
  });
