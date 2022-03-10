import {StyleSheet, ViewStyle} from 'react-native';
import {taskListMarginVertical} from '../../common/taskList/Styles';
import {FontAwesomeIconStyle} from '@fortawesome/react-native-fontawesome';

type TasksScreenStylesType = {
  tasksListContainer: ViewStyle;
  tabBarContainer: ViewStyle;
  tabLightIcon: FontAwesomeIconStyle;
  buttonContainer: ViewStyle;
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

  tabLightIcon: {
    color: '#fff',
  },

  buttonContainer: {
    marginRight: 10,
  },
});
