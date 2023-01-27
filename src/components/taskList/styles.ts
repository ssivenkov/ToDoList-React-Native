import { COLORS } from '@colors/colors';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type TaskListStylesType = {
  buttonsContainer: ViewStyle;
  container: ViewStyle;
  controlsContainer: ViewStyle;
  redHighlightTask: TextStyle;
  tasksContainer: ViewStyle;
  title: TextStyle;
  warnText: TextStyle;
};

export const TaskListMarginVertical = 4;

export const taskListStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<TaskListStylesType>({
    buttonsContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
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

    controlsContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    redHighlightTask: {
      color: COLORS.RED,
      fontWeight: '500',
    },

    tasksContainer: {
      marginTop: 2,
    },

    title: {
      color: props.TEXT_COLOR,
      flex: 1,
      fontSize: 21,
      marginLeft: 6,
    },

    warnText: {
      fontSize: 20,
    },
  });
