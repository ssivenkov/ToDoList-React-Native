import {COLORS} from '@colors/colors';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type EditTaskButtonStylesType = {
  warnText: TextStyle;
  redHighlightTask: TextStyle;
  notificationContainer: ViewStyle;
  text: TextStyle;
  dateTimePickerContainer: ViewStyle;
};

const {RED} = COLORS;

export const styles = StyleSheet.create<EditTaskButtonStylesType>({
  warnText: {
    marginBottom: 15,
    fontSize: 20,
  },

  redHighlightTask: {
    color: RED,
    fontWeight: '500',
  },

  notificationContainer: {
    marginTop: 23,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  text: {
    fontSize: 20,
    marginBottom: 2,
  },

  dateTimePickerContainer: {
    marginVertical: 10,
  },
});
