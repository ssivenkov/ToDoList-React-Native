import {COLORS} from '@colors/colors';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type InputStylesType = {
  container: ViewStyle;
  input: TextStyle;
};

const {BLACK, ALTO} = COLORS;

export const styles = StyleSheet.create<InputStylesType>({
  container: {
    flexDirection: 'row',
  },

  input: {
    width: '100%',
    alignContent: 'center',
    fontSize: 20,
    padding: 10,
    color: BLACK,
    backgroundColor: ALTO,
    borderRadius: 8,
  },
});
