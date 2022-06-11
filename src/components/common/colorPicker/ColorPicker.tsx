import {styles} from '@components/common/colorPicker/styles';
import {ColorPickerComponentPropsType} from '@components/common/colorPicker/types';
import {ColorType} from '@store/reducers/userReducer/types';
import React from 'react';
import {View} from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';

export const ColorPickerComponent = (props: ColorPickerComponentPropsType) => {
  const {color, selectColor, marginTop, marginRight} = props;

  const onColorChangeComplete = (color: ColorType) => {
    selectColor(color);
  };

  return (
    <View style={[styles.container, {marginTop}, {marginRight}]}>
      <ColorPicker
        color={color}
        swatchesOnly={false}
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
