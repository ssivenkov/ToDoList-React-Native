import {styles} from '@components/buttons/selectAccentColorButton/styles';
import {ColorPickerComponent} from '@components/common/colorPicker/ColorPicker';
import {ModalLongButton} from '@components/common/modals/ModalLongButton';
import {faPalette} from '@fortawesome/free-solid-svg-icons';
import {useStyles} from '@root/hooks/useStyles';
import {setAccentColorAction} from '@store/actions/userReducerActions/setAccentColorAction';
import {AccentColorType} from '@store/reducers/userReducer/types';
import {accentColorSelector} from '@store/selectors/userSelectors';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import 'react-native-get-random-values';
import {useDispatch, useSelector} from 'react-redux';

export const SelectAccentColorButton = () => {
  const {t} = useTranslation();

  const dispatch = useDispatch();

  const style = useStyles(styles);

  const initialAccentColor = useSelector(accentColorSelector);

  const [color, setColor] = useState<AccentColorType>(initialAccentColor);

  const colorIndicator = <View style={style.colorIndicator} />;

  const setAccentColor = (): void => {
    dispatch(setAccentColorAction({accentColor: color}));
  };

  return (
    <ModalLongButton
      buttonIcon={faPalette}
      okHandler={setAccentColor}
      description={t('accountScreen.AccentColorDescription')}
      buttonTitle={t('accountScreen.AccentColorButtonTitle')}
      rightComponent={colorIndicator}>
      <ColorPickerComponent selectAccentColor={setColor} />
    </ModalLongButton>
  );
};