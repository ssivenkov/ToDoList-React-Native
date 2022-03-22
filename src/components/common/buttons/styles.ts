import {COLORS} from '@colors/colors';
import {StyleSheet, ViewStyle, TextStyle} from 'react-native';

type CustomButtonStylesType = {
  bigButton: ViewStyle;
  disable: ViewStyle;
  textButton: ViewStyle;
  textButtonDisable: ViewStyle;
  bigText: TextStyle;
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
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: COLORS.CELTIC,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textButtonDisable: {
    backgroundColor: COLORS.ALTO,
  },

  bigText: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.WHITE,
  },

  text: {
    fontSize: 19,
    color: COLORS.WHITE,
  },

  icon: {
    marginHorizontal: 4,
  },
});
