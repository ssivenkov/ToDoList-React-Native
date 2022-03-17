import {FontAwesomeIconStyle} from '@fortawesome/react-native-fontawesome';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {taskListMarginVertical} from '../../common/taskList/styles';

type TasksScreenStylesType = {
  tasksListContainer: ViewStyle;
  nullContentContainer: ViewStyle;
  tabBarContainer: ViewStyle;
  tabLightIcon: FontAwesomeIconStyle;
  buttonContainer: ViewStyle;
  nullContentText: TextStyle;
};

export const styles = StyleSheet.create<TasksScreenStylesType>({
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

  tabBarContainer: {
    height: 50,
    backgroundColor: '#fff',
  },

  tabLightIcon: {
    color: '#fff',
  },

  buttonContainer: {
    marginRight: 10,
  },
});
