import {FontAwesomeIconStyle} from '@fortawesome/react-native-fontawesome';
import {StyleSheet, ViewStyle} from 'react-native';
import {COLORS} from '../../colors/colors';

type TasksScreenStylesType = {
  tabBarContainer: ViewStyle;
  tabBarItem: ViewStyle;
  tabLightIcon: FontAwesomeIconStyle;
  tabDarkIcon: FontAwesomeIconStyle;
  tabBarIndicator: ViewStyle;
};

export const styles = StyleSheet.create<TasksScreenStylesType>({
  tabBarContainer: {
    backgroundColor: COLORS.WHITE,
  },

  tabBarItem: {
    height: 60,
  },

  tabLightIcon: {
    color: COLORS.FRESH_EGGPLANT,
  },

  tabDarkIcon: {
    color: COLORS.BLACK,
  },

  tabBarIndicator: {
    backgroundColor: COLORS.FRESH_EGGPLANT,
  },
});
