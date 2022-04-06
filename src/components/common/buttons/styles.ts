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

export const styles = StyleSheet.create<CustomButtonStylesType>({
  bigButton: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 5,
    backgroundColor: COLORS.BLUE_GEM,
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
    backgroundColor: COLORS.CELTIC,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textButtonDisable: {
    backgroundColor: COLORS.ALTO,
  },

  text: {
    fontSize: 20,
    color: COLORS.WHITE,
  },

  icon: {
    marginHorizontal: 4,
  },
});
