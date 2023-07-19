import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type TaskListStylesType = {
  buttonsContainer: ViewStyle;
  container: ViewStyle;
  controlsContainer: ViewStyle;
  menuHorizontalWrapper: ViewStyle;
  tasksContainer: ViewStyle;
  title: TextStyle;
  visualExampleContainer: ViewStyle;
  visualExampleTitle: TextStyle;
};

export const TaskListMarginVertical = 4;

export const taskListStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<TaskListStylesType>({
    buttonsContainer: {
      alignItems: 'center',
      borderRadius: 20,
      flexDirection: 'row',
      width: '100%',
    },

    container: {
      backgroundColor: props.TASK_LIST_COLOR,
      borderRadius: 10,
      marginHorizontal: 9,
      marginVertical: TaskListMarginVertical,
      paddingBottom: 6,
      paddingHorizontal: 9,
      paddingTop: 5,
    },

    visualExampleContainer: {
      backgroundColor: props.TASK_LIST_COLOR,
      borderRadius: 10,
      marginVertical: TaskListMarginVertical,
      paddingBottom: 6,
      paddingHorizontal: 9,
      paddingTop: 5,
    },

    controlsContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    menuHorizontalWrapper: {
      borderRadius: 7,
      overflow: 'hidden',
    },

    tasksContainer: {
      marginTop: 2,
    },

    title: {
      color: props.TEXT_COLOR,
      flex: 1,
      alignSelf: 'center',
      marginLeft: 6,
      paddingRight: 1,
    },

    visualExampleTitle: {
      color: props.TEXT_COLOR,
      flex: 1,
      alignSelf: 'center',
      marginLeft: 6,
      paddingRight: 1,
    },
  });
