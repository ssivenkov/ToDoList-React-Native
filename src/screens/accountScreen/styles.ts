import {COLORS} from '@colors/colors';
import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

type UserScreenStylesType = {
  screenContainer: ViewStyle;
  avatar: ImageStyle;
  name: TextStyle;
  text: TextStyle;
  buttonContainer: ViewStyle;
  buttonsContainer: ViewStyle;
};

const avatarSize = 130;
const topMargin = 20;

export const styles = StyleSheet.create<UserScreenStylesType>({
  screenContainer: {
    marginHorizontal: 15,
    marginTop: 50,
    alignItems: 'center',
  },

  avatar: {
    width: avatarSize,
    height: avatarSize,
    borderRadius: 100,
  },

  name: {
    fontSize: 30,
    fontWeight: '500',
    color: COLORS.BLACK,
    marginTop: topMargin,
  },

  text: {
    fontSize: 22,
    color: COLORS.BLACK,
    marginTop: 10,
  },

  buttonContainer: {
    marginTop: topMargin,
    marginHorizontal: 15,
  },

  buttonsContainer: {
    flexDirection: 'row',
    marginTop: topMargin,
  },
});
