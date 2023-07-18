import { ViewStyle, TextStyle } from 'react-native';

type RangeSliderValueType = number;

export type RangeSliderPropsType = {
  initialAndCurrentValue: RangeSliderValueType;
  maxValue: RangeSliderValueType;
  minValue: RangeSliderValueType;
  setValue: (value: RangeSliderValueType) => void;

  step: number;
  thumbColor: string;
  trackColor: string;
  valueContainerStyle: ViewStyle;
  valueStyle: TextStyle;

  maxWidth?: number;
  sliderMarginHorizontal?: number;
  touchableAreaHeight?: number;
};
