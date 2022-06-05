import {ColorPickerComponentPropsType} from '@components/common/colorPicker/types';
import {AccentColorType} from '@store/reducers/userReducer/types';
import {accentColorSelector} from '@store/selectors/userSelectors';
import React from 'react';
import {View} from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import {useSelector} from 'react-redux';

export const ColorPickerComponent = (props: ColorPickerComponentPropsType) => {
  const {selectAccentColor} = props;

  const initialAccentColor = useSelector(accentColorSelector);

  const onColorChangeComplete = (color: AccentColorType) => {
    selectAccentColor(color);
  };

  return (
    <View style={{maxHeight: 200, alignItems: 'center'}}>
      <ColorPicker
        color={initialAccentColor}
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
