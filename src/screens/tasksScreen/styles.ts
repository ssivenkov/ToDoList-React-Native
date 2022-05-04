import {COLORS} from '@colors/colors';
import {TaskListMarginVertical} from '@components/common/taskList/styles';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type TodoTasksScreenStylesType = {
  tasksListContainer: ViewStyle;
  nullContentContainer: ViewStyle;
  nullContentText: TextStyle;
};

const {BLACK} = COLORS;

export const styles = StyleSheet.create<TodoTasksScreenStylesType>({
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
    color: BLACK,
    textAlign: 'center',
  },
});
