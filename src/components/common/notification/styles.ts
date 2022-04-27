import {COLORS} from '@colors/colors';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type DeleteTaskListButtonStylesType = {
  notificationContainer: ViewStyle;
  text: TextStyle;
  dateTimePickerContainer: ViewStyle;
};

const {BLACK} = COLORS;

export const styles = StyleSheet.create<DeleteTaskListButtonStylesType>({
  notificationContainer: {
    marginTop: 23,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  text: {
    color: BLACK,
    fontSize: 20,
    marginBottom: 2,
  },

  dateTimePickerContainer: {
    marginVertical: 10,
  },
});
