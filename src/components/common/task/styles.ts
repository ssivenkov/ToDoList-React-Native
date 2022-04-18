import {COLORS} from '@colors/colors';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type TaskStylesType = {
  container: ViewStyle;
  text: TextStyle;
  buttonsContainer: ViewStyle;
  warnText: TextStyle;
  redHighlightTask: TextStyle;
  greenHighlightTask: TextStyle;
};

const {SILVER_CHALICE, BLACK, RED, COD_GRAY} = COLORS;
const textSize = 20;

export const styles = StyleSheet.create<TaskStylesType>({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 3,
    borderRadius: 7,
    backgroundColor: SILVER_CHALICE,
  },

  text: {
    flex: 1,
    color: BLACK,
    fontSize: textSize,
  },

  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  warnText: {
    color: BLACK,
    fontSize: textSize,
  },

  redHighlightTask: {
    color: RED,
    fontWeight: '500',
  },

  greenHighlightTask: {
    color: COD_GRAY,
    fontWeight: '500',
  },
});
