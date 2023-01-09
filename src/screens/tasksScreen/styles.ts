import { TaskListMarginVertical } from '@components/taskList/styles';
import { ExtendedStylesPropsType } from '@hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type TasksScreenStylesType = {
  tasksListContainer: ViewStyle;
  nullContentContainer: ViewStyle;
  nullContentText: TextStyle;
};

export const taskScreenStyles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<TasksScreenStylesType>({
    tasksListContainer: {
      marginVertical: TaskListMarginVertical,
    },

    nullContentContainer: {
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },

    nullContentText: {
      fontSize: 22,
      textAlign: 'center',
      color: props.TEXT_COLOR,
    },
  });
