import {COLORS} from '@colors/colors';
import {StyleSheet, TextStyle} from 'react-native';

type DeleteTaskListButtonStylesType = {
  warnText: TextStyle;
  greenHighlightTask: TextStyle;
};

const {BLACK, JAPANESE_LAUREL} = COLORS;

export const styles = StyleSheet.create<DeleteTaskListButtonStylesType>({
  warnText: {
    marginBottom: 15,
    color: BLACK,
    fontSize: 20,
  },

  greenHighlightTask: {
    color: JAPANESE_LAUREL,
    fontWeight: '500',
  },
});
