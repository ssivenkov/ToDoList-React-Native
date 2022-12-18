import { COLORS } from '@colors/colors';
import { ExtendedStylesPropsType } from '@root/hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type TaskStylesType = {
  container: ViewStyle;
  colorMark: ViewStyle;
  text: TextStyle;
  buttonsContainer: ViewStyle;
  warnText: TextStyle;
  redHighlightTask: TextStyle;
  greenHighlightTask: TextStyle;
};

const { RED, DUSTY_GRAY } = COLORS;

const textSize = 18;

const taskContainerBorderRadius = 7;

export const styles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<TaskStylesType>({
    container: {
      marginVertical: 3,
      overflow: 'hidden',
      borderRadius: taskContainerBorderRadius,
      backgroundColor: props.TASK_COLOR,
    },

    colorMark: {
      height: '100%',
      width: 6,
    },

    text: {
      flex: 1,
      color: props.TEXT_COLOR,
      fontSize: textSize,
      paddingVertical: 4,
      paddingLeft: 7,
    },

    buttonsContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },

    warnText: {
      fontSize: textSize,
    },

    redHighlightTask: {
      color: RED,
      fontWeight: '500',
    },

    greenHighlightTask: {
      color: DUSTY_GRAY,
      fontWeight: '500',
    },
  });
