import {FontAwesomeIconStyle} from '@fortawesome/react-native-fontawesome';
import {StyleSheet, ViewStyle} from 'react-native';

type NavigationStylesType = {
  tabBarContainer: ViewStyle;
  tabLightIcon: FontAwesomeIconStyle;
  tabDarkIcon: FontAwesomeIconStyle;
};

export const styles = StyleSheet.create<NavigationStylesType>({
  tabBarContainer: {
    height: 50,
    backgroundColor: '#fff',
  },

  tabLightIcon: {
    color: '#fff',
  },

  tabDarkIcon: {
    color: '#000',
  },
});
