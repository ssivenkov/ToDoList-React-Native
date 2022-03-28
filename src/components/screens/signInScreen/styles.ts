import {COLORS} from '@colors/colors';
import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

type SignInScreenStylesType = {
  signInScreenContainer: ViewStyle;
  screenTitle: TextStyle;
  avatar: ImageStyle;
};

export const styles = StyleSheet.create<SignInScreenStylesType>({
  signInScreenContainer: {
    marginHorizontal: 15,
    alignItems: 'center',
  },

  screenTitle: {
    fontSize: 30,
    fontWeight: '500',
    color: COLORS.BLACK,
    marginTop: 30,
    marginBottom: 10,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 100,
    marginBottom: 15,
  },
});
