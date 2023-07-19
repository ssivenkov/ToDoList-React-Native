import React from 'react';

import { SliderScreenStyles as styles } from '@components/rangeSlider/styles';
import { RangeSliderPropsType } from '@components/rangeSlider/types';
import Slider from '@react-native-community/slider';
import { Text, View } from 'react-native';

const DEFAULT_MAX_WIDTH = 450;
const DEFAULT_TOUCHABLE_AREA_HEIGHT = 50;

export const RangeSlider = (props: RangeSliderPropsType) => {
  const {
    initialAndCurrentValue,
    minValue,
    maxValue,
    maxWidth,
    setValue,
    sliderMarginHorizontal,
    step,
    thumbColor,
    touchableAreaHeight,
    trackColor,
    valueStyle,
    valueContainerStyle,
  } = props;

  return (
    <View
      style={[styles.sliderContainer, { paddingHorizontal: sliderMarginHorizontal ?? 0 }]}
    >
      <View style={valueContainerStyle}>
        <Text style={valueStyle}>{initialAndCurrentValue}</Text>
      </View>
      <Slider
        maximumTrackTintColor={trackColor}
        maximumValue={maxValue}
        minimumTrackTintColor={trackColor}
        minimumValue={minValue}
        onValueChange={(value) => setValue(value)}
        step={step}
        style={{
          width: '100%',
          maxWidth: maxWidth ?? DEFAULT_MAX_WIDTH,
          height: touchableAreaHeight ?? DEFAULT_TOUCHABLE_AREA_HEIGHT,
        }}
        thumbTintColor={thumbColor}
        value={initialAndCurrentValue}
      />
    </View>
  );
};
