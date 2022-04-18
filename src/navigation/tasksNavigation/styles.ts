import {COLORS} from '@colors/colors';
import {FontAwesomeIconStyle} from '@fortawesome/react-native-fontawesome';
import {StyleSheet, ViewStyle} from 'react-native';

type TasksNavigationStylesType = {
  tabBarContainer: ViewStyle;
  tabBarItem: ViewStyle;
  tabLightIcon: FontAwesomeIconStyle;
  tabDarkIcon: FontAwesomeIconStyle;
  tabBarIndicator: ViewStyle;
};

const {BLACK, WHITE, FRESH_EGGPLANT} = COLORS;

export const styles = StyleSheet.create<TasksNavigationStylesType>({
  tabBarContainer: {
    backgroundColor: WHITE,
  },

  tabBarItem: {
    height: 60,
  },

  tabLightIcon: {
    color: FRESH_EGGPLANT,
  },

  tabDarkIcon: {
    color: BLACK,
  },

  tabBarIndicator: {
    backgroundColor: FRESH_EGGPLANT,
  },
});
