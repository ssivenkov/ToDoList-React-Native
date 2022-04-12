import {COLORS} from '@colors/colors';
import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

type UserScreenStylesType = {
  screenContainer: ViewStyle;
  avatar: ImageStyle;
  name: TextStyle;
  text: TextStyle;
  buttonContainer: ViewStyle;
};

export const styles = StyleSheet.create<UserScreenStylesType>({
  screenContainer: {
    marginHorizontal: 15,
    marginTop: 50,
    alignItems: 'center',
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 100,
    marginBottom: 20,
  },

  name: {
    fontSize: 30,
    fontWeight: '500',
    color: COLORS.BLACK,
    marginBottom: 10,
  },

  text: {
    fontSize: 22,
    color: COLORS.BLACK,
    marginBottom: 10,
  },

  buttonContainer: {
    marginTop: 20,
  },
});