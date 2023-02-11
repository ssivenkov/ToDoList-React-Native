import { TaskListMarginVertical } from '@components/taskList/styles';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type TasksScreenStylesType = {
  nullContentContainer: ViewStyle;
  nullContentText: TextStyle;
  tasksListContainer: ViewStyle;
};

export const taskScreenStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<TasksScreenStylesType>({
    nullContentContainer: {
      alignItems: 'center',
      height: '100%',
      justifyContent: 'center',
    },

    nullContentText: {
      color: props.TEXT_COLOR,
      fontSize: 22,
      textAlign: 'center',
    },

    tasksListContainer: {
      marginVertical: TaskListMarginVertical,
    },
  });
