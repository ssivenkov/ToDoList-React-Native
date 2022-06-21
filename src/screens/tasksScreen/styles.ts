import { TaskListMarginVertical } from '@components/common/taskList/styles';
import { ExtendedStylesPropsType } from '@root/hooks/useStyles';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type TodoTasksScreenStylesType = {
  tasksListContainer: ViewStyle;
  nullContentContainer: ViewStyle;
  nullContentText: TextStyle;
};

export const styles = (props: ExtendedStylesPropsType) =>
  StyleSheet.create<TodoTasksScreenStylesType>({
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
