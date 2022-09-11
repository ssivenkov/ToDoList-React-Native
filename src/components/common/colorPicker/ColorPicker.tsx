import React from 'react';

import { COLORS } from '@colors/colors';
import { styles } from '@components/common/colorPicker/styles';
import { ColorPickerComponentPropsType } from '@components/common/colorPicker/types';
import { ColorType } from '@store/reducers/userReducer/types';
import { View } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';

export const ColorPickerComponent = (props: ColorPickerComponentPropsType) => {
  const { color, selectColor, marginTop, marginRight } = props;

  const {
    CRIMSON,
    FLAMINGO,
    CANDLELIGHT,
    GREEN,
    CERULEAN,
    PERSIAN_BLUE,
    ELECTRIC_VIOLET,
  } = COLORS;

  const onColorChangeComplete = (color: ColorType) => {
    selectColor(color);
  };

  return (
    <View style={[styles.container, { marginTop }, { marginRight }]}>
      <ColorPicker
        color={color}
        discrete={false}
        noSnap={false}
        onColorChangeComplete={(color) => onColorChangeComplete(color)}
        palette={[
          CRIMSON,
          FLAMINGO,
          CANDLELIGHT,
          GREEN,
          CERULEAN,
          PERSIAN_BLUE,
          ELECTRIC_VIOLET,
        ]}
        row
        sliderSize={40}
        swatches
        swatchesLast={false}
        swatchesOnly={false}
        thumbSize={40}
      />
    </View>
  );
};
