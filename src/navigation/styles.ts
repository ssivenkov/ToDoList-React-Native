import {COLORS} from '@colors/colors';
import {FontAwesomeIconStyle} from '@fortawesome/react-native-fontawesome';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type NavigationStylesType = {
  header: ViewStyle;
  headerTitleStyle: TextStyle;
  tabBarContainer: ViewStyle;
  tabLightIcon: FontAwesomeIconStyle;
  tabDarkIcon: FontAwesomeIconStyle;
  buttonContainer: ViewStyle;
  icon: TextStyle;
  title: TextStyle;
};

export const styles = StyleSheet.create<NavigationStylesType>({
  header: {
    backgroundColor: COLORS.POMPADOUR,
  },

  headerTitleStyle: {
    color: COLORS.WHITE,
    fontSize: 22,
  },

  tabBarContainer: {
    height: 55,
    backgroundColor: COLORS.WHITE,
  },

  tabLightIcon: {
    color: COLORS.WHITE,
  },

  tabDarkIcon: {
    color: COLORS.BLACK,
  },

  buttonContainer: {
    marginRight: 10,
  },

  icon: {
    marginTop: 5,
  },

  title: {
    fontSize: 16,
  },
});
