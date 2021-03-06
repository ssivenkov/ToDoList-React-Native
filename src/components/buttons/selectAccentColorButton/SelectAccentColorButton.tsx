import React, { useState } from 'react';

import { styles } from '@components/buttons/selectAccentColorButton/styles';
import { SelectAccentColorButtonPropsType } from '@components/buttons/selectAccentColorButton/types';
import { ColorPickerComponent } from '@components/common/colorPicker/ColorPicker';
import { ModalLongButton } from '@components/common/modals/ModalLongButton';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import { useStyles } from '@root/hooks/useStyles';
import { changeAccentColorAction } from '@store/actions/userSagaActions/changeAccentColorAction';
import { ColorType } from '@store/reducers/userReducer/types';
import { accentColorSelector } from '@store/selectors/userSelectors';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import 'react-native-get-random-values';
import { useDispatch, useSelector } from 'react-redux';

export const SelectAccentColorButton = (props: SelectAccentColorButtonPropsType) => {
  const { setIsLoading } = props;

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const style = useStyles(styles);

  const initialAccentColor = useSelector(accentColorSelector);

  const [color, setColor] = useState<ColorType>(initialAccentColor);

  const setAccentColor = (): void => {
    dispatch(
      changeAccentColorAction({
        accentColor: color,
        setIsLoading,
      }),
    );
  };

  const setInitialAccentColor = () => {
    setColor(initialAccentColor);
  };

  return (
    <ModalLongButton
      buttonIcon={faPalette}
      buttonTitle={t('accountScreen.AccentColorButtonTitle')}
      closeHandler={setInitialAccentColor}
      description={t('accountScreen.AccentColorDescription')}
      okHandler={setAccentColor}
      rightComponent={<View style={style.colorIndicator} />}
    >
      <ColorPickerComponent color={color} selectColor={setColor} />
    </ModalLongButton>
  );
};
