import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {taskListMarginVertical} from '../../common/taskList/styles';

type DoneTasksScreenStylesType = {
  tasksListContainer: ViewStyle;
  nullContentContainer: ViewStyle;
  nullContentText: TextStyle;
};

export const styles = StyleSheet.create<DoneTasksScreenStylesType>({
  tasksListContainer: {
    backgroundColor: '#eee',
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
