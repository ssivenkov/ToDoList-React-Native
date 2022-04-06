import {COLORS} from '@colors/colors';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type TasksScreenStylesType = {
  signInWrapper: ViewStyle;
  signInContainer: ViewStyle;
  screenTitle: TextStyle;
};

export const styles = StyleSheet.create<TasksScreenStylesType>({
  signInWrapper: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
  },

  signInContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  screenTitle: {
    fontSize: 30,
    fontWeight: '500',
    color: COLORS.BLACK,
    marginBottom: 25,
  },
});
