import React from 'react';

import { COLORS } from '@colors/colors';
import { ColorType } from '@store/reducers/userReducer/types';
import { selectedColorSelector } from '@store/selectors/userSelectors';
import { View } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import { useSelector } from 'react-redux';

import { styles } from './styles';
import { ColorPickerComponentPropsType } from './types';

export const ColorPickerComponent = (props: ColorPickerComponentPropsType) => {
  const { color, setSelectedColor, marginTop, marginRight } = props;

  const selectedColor = useSelector(selectedColorSelector);

  const { CRIMSON, PIZAZZ, TURBO, GREEN, CYAN_AQUA, PERSIAN_BLUE, PURPLE_HEART } = COLORS;

  const onColorChangeComplete = (colorFromColorPicker: ColorType) => {
    setSelectedColor(colorFromColorPicker);
  };

  return (
    <View style={[styles.container, { marginTop }, { marginRight }]}>
      <ColorPicker
        color={color ?? selectedColor}
        discrete={false}
        noSnap={false}
        onColorChangeComplete={(color) => onColorChangeComplete(color)}
        palette={[CRIMSON, PIZAZZ, TURBO, GREEN, CYAN_AQUA, PERSIAN_BLUE, PURPLE_HEART]}
        row={true}
        sliderSize={40}
        swatches={true}
        swatchesLast={false}
        swatchesOnly={false}
        thumbSize={40}
      />
    </View>
  );
};
