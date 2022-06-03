import React from 'react';
import {View} from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';

export const ColorPickerComponent = () => {
  const onColorChangeComplete = (color: string) => {
    console.log('onColorChangeComplete: ', color);
  };

  const onColorChange = (color: string) => {
    console.log('onColorChange: ', color);
  };

  return (
    <View style={{maxHeight: 200, alignItems: 'center'}}>
      <ColorPicker
        color={'#990000'}
        swatchesOnly={false}
        onColorChange={(color) => onColorChange(color)}
        onColorChangeComplete={(color) => onColorChangeComplete(color)}
        thumbSize={40}
        sliderSize={40}
        noSnap={false}
        row={true}
        swatchesLast={false}
        swatches={false}
        discrete={false}
      />
    </View>
  );
};
