import {StyleSheet, TextStyle} from 'react-native';
import {COLORS} from '../../../colors/colors';

type DeleteTaskListButtonStylesType = {
  warnText: TextStyle;
  redHighlightTask: TextStyle;
};

export const styles = StyleSheet.create<DeleteTaskListButtonStylesType>({
  warnText: {
    marginBottom: 15,
    color: COLORS.BLACK,
    fontSize: 20,
  },

  redHighlightTask: {
    color: COLORS.RED,
    fontWeight: '500',
  },
});
