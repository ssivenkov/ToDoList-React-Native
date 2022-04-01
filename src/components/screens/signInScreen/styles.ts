import {COLORS} from '@colors/colors';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type SignInScreenStylesType = {
  signInContainer: ViewStyle;
  screenTitle: TextStyle;
};

export const styles = StyleSheet.create<SignInScreenStylesType>({
  signInContainer: {
    paddingHorizontal: 50,
    alignItems: 'center',
  },

  screenTitle: {
    fontSize: 30,
    fontWeight: '500',
    color: COLORS.BLACK,
    marginTop: 30,
    marginBottom: 10,
  },
});
