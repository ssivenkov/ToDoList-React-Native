import {FontAwesomeIconStyle} from '@fortawesome/react-native-fontawesome';
import {StyleSheet, ViewStyle} from 'react-native';

type TasksScreenStylesType = {
  tabBarContainer: ViewStyle;
  tabBarItem: ViewStyle;
  tabLightIcon: FontAwesomeIconStyle;
  tabDarkIcon: FontAwesomeIconStyle;
  tabBarIndicator: ViewStyle;
};

export const styles = StyleSheet.create<TasksScreenStylesType>({
  tabBarContainer: {
    backgroundColor: '#fff',
  },

  tabBarItem: {
    height: 60,
  },

  tabLightIcon: {
    color: 'purple',
  },

  tabDarkIcon: {
    color: '#000',
  },

  tabBarIndicator: {
    backgroundColor: 'darkmagenta',
  },
});
