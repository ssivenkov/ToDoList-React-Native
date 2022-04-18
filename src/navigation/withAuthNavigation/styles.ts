import {COLORS} from '@colors/colors';
import {FontAwesomeIconStyle} from '@fortawesome/react-native-fontawesome';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type WithAuthNavigationStylesType = {
  header: ViewStyle;
  headerTitleStyle: TextStyle;
  tabBarContainer: ViewStyle;
  tabLightIcon: FontAwesomeIconStyle;
  tabDarkIcon: FontAwesomeIconStyle;
  buttonContainer: ViewStyle;
  icon: TextStyle;
  title: TextStyle;
};

const {BLACK, WHITE, POMPADOUR} = COLORS;

export const styles = StyleSheet.create<WithAuthNavigationStylesType>({
  header: {
    backgroundColor: POMPADOUR,
  },

  headerTitleStyle: {
    color: WHITE,
    fontSize: 22,
  },

  tabBarContainer: {
    height: 55,
    backgroundColor: WHITE,
  },

  tabLightIcon: {
    color: WHITE,
  },

  tabDarkIcon: {
    color: BLACK,
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
