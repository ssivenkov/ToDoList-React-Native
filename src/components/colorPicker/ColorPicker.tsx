import React from 'react';

import { COLORS } from '@colors/colors';
import { ColorType } from '@store/reducers/userReducer/types';
import { selectedColorSelector } from '@store/selectors/userSelectors';
import ColorPicker from 'react-native-wheel-color-picker';
import { useSelector } from 'react-redux';

import { ColorPickerComponentPropsType } from './types';

export const ColorPickerComponent = (props: ColorPickerComponentPropsType) => {
  const { color, setSelectedColor, gapSize } = props;

  const selectedColor = useSelector(selectedColorSelector);

  const { CRIMSON, PIZAZZ, TURBO, GREEN, CYAN_AQUA, PERSIAN_BLUE, PURPLE_HEART } = COLORS;

  const onColorChangeComplete = (colorFromColorPicker: ColorType) => {
    setSelectedColor(colorFromColorPicker);
  };

  return (
    <ColorPicker
      color={color ?? selectedColor}
      discrete={false}
      gapSize={gapSize}
      noSnap={false}
      onColorChangeComplete={(color) => onColorChangeComplete(color)}
      palette={[CRIMSON, PIZAZZ, TURBO, GREEN, CYAN_AQUA, PERSIAN_BLUE, PURPLE_HEART]}
      row={true}
      sliderSize={40}
      swatches={true}
      swatchesLast={false}
      swatchesOnly={false}
      thumbSize={30}
    />
  );
};
