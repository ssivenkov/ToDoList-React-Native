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
    backgroundColor: '#610061',
  },

  headerTitleStyle: {
    color: '#fff',
    fontSize: 22,
  },

  tabBarContainer: {
    height: 55,
    backgroundColor: '#fff',
  },

  tabLightIcon: {
    color: '#fff',
  },

  tabDarkIcon: {
    color: '#000',
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
