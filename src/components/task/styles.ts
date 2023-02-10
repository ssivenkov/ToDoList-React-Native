import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type TaskStylesType = {
  buttonsContainer: ViewStyle;
  colorMark: ViewStyle;
  container: ViewStyle;
  text: TextStyle;
};

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

    text: {
      color: props.TEXT_COLOR,
      flex: 1,
      fontSize: textSize,
      marginLeft: 7,
      marginRight: 1.5347,
      paddingVertical: 4,
    },
  });
