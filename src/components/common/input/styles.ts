import {COLORS} from '@colors/colors';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type InputStylesType = {
  container: ViewStyle;
  input: TextStyle;
};

export const styles = StyleSheet.create<InputStylesType>({
  container: {
    flexDirection: 'row',
  },

  input: {
    width: '100%',
    alignContent: 'center',
    fontSize: 20,
    paddingHorizontal: 10,
    color: COLORS.BLACK,
    backgroundColor: COLORS.ALTO,
    borderRadius: 8,
  },
});
