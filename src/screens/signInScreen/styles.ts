import {COLORS} from '@colors/colors';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type TasksScreenStylesType = {
  signInWrapper: ViewStyle;
  signInContainer: ViewStyle;
  screenTitle: TextStyle;
};

const {BLACK, WHITE} = COLORS;

export const styles = StyleSheet.create<TasksScreenStylesType>({
  signInWrapper: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
    backgroundColor: WHITE,
  },

  signInContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  screenTitle: {
    fontSize: 30,
    fontWeight: '500',
    color: BLACK,
    marginBottom: 25,
  },
});