import React from 'react';

import { COLORS } from '@colors/colors';
import { styles } from '@components/common/colorPicker/styles';
import { ColorPickerComponentPropsType } from '@components/common/colorPicker/types';
import { ColorType } from '@store/reducers/userReducer/types';
import { selectedColorSelector } from '@store/selectors/userSelectors';
import { View } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import { useSelector } from 'react-redux';

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
