import {COLORS} from '@colors/colors';
import {taskListMarginVertical} from '@components/common/taskList/styles';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type TodoTasksScreenStylesType = {
  tasksListContainer: ViewStyle;
  nullContentContainer: ViewStyle;
  nullContentText: TextStyle;
};

export const styles = StyleSheet.create<TodoTasksScreenStylesType>({
  tasksListContainer: {
    marginVertical: taskListMarginVertical,
  },

  nullContentContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  nullContentText: {
    fontSize: 22,
    color: COLORS.BLACK,
  },
});
