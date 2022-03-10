import {StyleSheet, ViewStyle} from 'react-native';
import {FontAwesomeIconStyle} from '@fortawesome/react-native-fontawesome';

type NavigationStylesType = {
  tabBarContainer: ViewStyle;
  tabLightIcon: FontAwesomeIconStyle;
};

export const styles = StyleSheet.create<NavigationStylesType>({
  tabBarContainer: {
    height: 50,
    backgroundColor: '#fff',
  },

  tabLightIcon: {
    color: '#fff',
  },
});
