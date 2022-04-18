import {COLORS} from '@colors/colors';
import {StyleSheet, TextStyle} from 'react-native';

type DeleteTaskListButtonStylesType = {
  warnText: TextStyle;
  redHighlightTask: TextStyle;
};

const {BLACK, RED} = COLORS;

export const styles = StyleSheet.create<DeleteTaskListButtonStylesType>({
  warnText: {
    marginBottom: 15,
    color: BLACK,
    fontSize: 20,
  },

  redHighlightTask: {
    color: RED,
    fontWeight: '500',
  },
});
