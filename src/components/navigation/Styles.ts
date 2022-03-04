import {StyleSheet, ImageStyle, ViewStyle} from 'react-native';

type NavigationStylesType = {
  tabBarContainer: ViewStyle;
  tabImage: ImageStyle;
};

export const styles = StyleSheet.create<NavigationStylesType>({
  tabBarContainer: {
    height: 50,
    backgroundColor: '#fff',
  },

  tabImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
});
