import {StyleSheet, ImageStyle, ViewStyle} from 'react-native';
import {taskListMarginVertical} from '../../common/taskList/Styles';

type TasksScreenStylesType = {
  tasksListContainer: ViewStyle;
  tabBarContainer: ViewStyle;
  tabImage: ImageStyle;
};

export const styles = StyleSheet.create<TasksScreenStylesType>({
  tasksListContainer: {
    width: '100%',
    display: 'flex',
    backgroundColor: '#eee',
    paddingVertical: taskListMarginVertical,
  },

  tabBarContainer: {
    height: 50,
    backgroundColor: '#fff',
  },

  tabImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
});
