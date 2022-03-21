import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {taskListMarginVertical} from '../../common/taskList/styles';

type TodoTasksScreenStylesType = {
  tasksListContainer: ViewStyle;
  nullContentContainer: ViewStyle;
  nullContentText: TextStyle;
};

export const styles = StyleSheet.create<TodoTasksScreenStylesType>({
  tasksListContainer: {
    paddingVertical: taskListMarginVertical,
  },

  nullContentContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  nullContentText: {
    fontSize: 22,
    color: '#000',
  },
});
