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

export const styles = StyleSheet.create<TaskStylesType>({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 3,
    borderRadius: 7,
    backgroundColor: COLORS.SILVER_CHALICE,
  },

  text: {
    flex: 1,
    color: COLORS.BLACK,
    fontSize: 20,
  },

  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  warnText: {
    color: COLORS.BLACK,
    fontSize: 20,
  },

  redHighlightTask: {
    color: COLORS.RED,
    fontWeight: '500',
  },

  greenHighlightTask: {
    color: COLORS.COD_GRAY,
    fontWeight: '500',
  },
});
