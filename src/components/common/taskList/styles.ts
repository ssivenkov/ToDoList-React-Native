import { COLORS } from '@colors/colors';
import { ExtendedStylesPropsType } from '@root/hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type TaskListStylesType = {
  container: ViewStyle;
  title: TextStyle;
  controlsContainer: ViewStyle;
  buttonsContainer: ViewStyle;
  warnText: TextStyle;
  redHighlightTask: TextStyle;
  tasksContainer: ViewStyle;
};

export const TaskListMarginVertical = 4;

export const styles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<TaskListStylesType>({
    container: {
      backgroundColor: props.TASK_LIST_COLOR,
      paddingTop: 6,
      paddingBottom: 7,
      paddingHorizontal: 9,
      marginHorizontal: 10,
      marginVertical: TaskListMarginVertical,
      borderRadius: 10,
    },

    controlsContainer: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },

    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },

    title: {
      flex: 1,
      color: props.TEXT_COLOR,
      fontSize: 21,
      marginLeft: 6,
    },

    warnText: {
      fontSize: 20,
    },

    redHighlightTask: {
      color: COLORS.RED,
      fontWeight: '500',
    },

    tasksContainer: {
      marginTop: TaskListMarginVertical,
    },
  });
