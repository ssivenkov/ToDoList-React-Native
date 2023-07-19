import { StyleSheet, ViewStyle } from 'react-native';

type SliderStylesType = {
  sliderContainer: ViewStyle;
};

export const SliderScreenStyles = StyleSheet.create<SliderStylesType>({
  sliderContainer: {
    width: '100%',
    alignItems: 'center',
  },
});
