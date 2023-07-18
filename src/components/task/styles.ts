import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type TaskStylesType = {
  buttonsContainer: ViewStyle;
  colorMark: ViewStyle;
  taskContainer: ViewStyle;
  text: TextStyle;
  visualExampleText: TextStyle;
};

const TASK_CONTAINER_BORDER_RADIUS = 7;

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

    taskContainer: {
      backgroundColor: props.TASK_COLOR,
      borderRadius: TASK_CONTAINER_BORDER_RADIUS,
      marginVertical: 3,
      overflow: 'hidden',
    },

    text: {
      color: props.TEXT_COLOR,
      flex: 1,
      alignSelf: 'center',
      marginLeft: 7,
      marginRight: 1.5347,
      paddingVertical: 4,
    },

    visualExampleText: {
      color: props.TEXT_COLOR,
      flex: 1,
      alignSelf: 'center',
      marginLeft: 7,
      marginRight: 1.5347,
      paddingVertical: 4,
    },
  });
