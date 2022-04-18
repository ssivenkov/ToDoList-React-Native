import {COLORS} from '@colors/colors';
import {StyleSheet, ViewStyle, TextStyle} from 'react-native';

type CustomButtonStylesType = {
  bigButton: ViewStyle;
  disable: ViewStyle;
  textButton: ViewStyle;
  textButtonDisable: ViewStyle;
  text: TextStyle;
  icon: ViewStyle;
};

const {BLUE_GEM, CELTIC, ALTO, WHITE} = COLORS;

export const styles = StyleSheet.create<CustomButtonStylesType>({
  bigButton: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 5,
    backgroundColor: BLUE_GEM,
    justifyContent: 'center',
    alignItems: 'center',
  },

  disable: {
    opacity: 0.4,
  },

  textButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: CELTIC,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textButtonDisable: {
    backgroundColor: ALTO,
  },

  text: {
    fontSize: 20,
    color: WHITE,
  },

  icon: {
    marginHorizontal: 4,
  },
});
