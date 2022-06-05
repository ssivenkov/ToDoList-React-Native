import {ColorPickerButtonPropsType} from '@components/buttons/colorPickerButton/types';
import {ColorPickerComponent} from '@components/common/colorPicker/ColorPicker';
import {ModalText} from '@components/common/modals/ModalText';
import {AccentColorType} from '@store/reducers/userReducer/types';
import {accentColorSelector} from '@store/selectors/userSelectors';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import 'react-native-get-random-values';
import {useSelector} from 'react-redux';

export const ColorPickerButton = (props: ColorPickerButtonPropsType) => {
  const {setAccentColor, description, buttonTitle, containerStyle} = props;

  const {t} = useTranslation();

  const initialAccentColor = useSelector(accentColorSelector);

  const [color, setColor] = useState<AccentColorType>(initialAccentColor);

  const selectAccentColor = () => {
    setAccentColor(color);
  };

  return (
    <ModalText
      okHandler={selectAccentColor}
      description={t(description)}
      buttonTitle={t(buttonTitle)}
      buttonContainerStyle={containerStyle && containerStyle}>
      <ColorPickerComponent selectAccentColor={setColor} />
    </ModalText>
  );
};
