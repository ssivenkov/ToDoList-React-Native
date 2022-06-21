import React from 'react';

import { styles } from '@components/common/colorPicker/styles';
import { ColorPickerComponentPropsType } from '@components/common/colorPicker/types';
import { ColorType } from '@store/reducers/userReducer/types';
import { View } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';

export const ColorPickerComponent = (props: ColorPickerComponentPropsType) => {
  const { color, selectColor, marginTop, marginRight } = props;

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
        row
        sliderSize={40}
        swatches={false}
        swatchesLast={false}
        swatchesOnly={false}
        thumbSize={40}
      />
    </View>
  );
};
