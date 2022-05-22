import {COLORS} from '@colors/colors';
import {FontAwesomeIconStyle} from '@fortawesome/react-native-fontawesome';
import {Platform, StyleSheet, TextStyle, ViewStyle} from 'react-native';

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
    fontSize: 24,
  },

  tabBarContainer: {
    height: Platform.OS === 'ios' ? 87 : 58,
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
    marginBottom: 2,
  },
});
