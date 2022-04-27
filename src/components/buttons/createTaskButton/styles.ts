import {COLORS} from '@colors/colors';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type CreateTaskButtonStylesType = {
  notificationContainer: ViewStyle;
  text: TextStyle;
  dateTimePickerContainer: ViewStyle;
};

export const styles = StyleSheet.create<CreateTaskButtonStylesType>({
  notificationContainer: {
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

  dateTimePickerContainer: {
    marginVertical: 10,
  },
});
