import {COLORS} from '@colors/colors';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type DeleteTaskListButtonStylesType = {
  notificationContainer: ViewStyle;
  switchNotificationContainer: ViewStyle;
  text: TextStyle;
};

export const styles = StyleSheet.create<DeleteTaskListButtonStylesType>({
  notificationContainer: {
    width: '100%',
    overflow: 'hidden',
  },

  switchNotificationContainer: {
    marginTop: 23,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  text: {
    color: COLORS.BLACK,
    fontSize: 20,
    marginBottom: 2,
  },
});
