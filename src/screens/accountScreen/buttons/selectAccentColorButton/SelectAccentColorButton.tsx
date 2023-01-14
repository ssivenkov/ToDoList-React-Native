import React, { useState } from 'react';

import { ColorPickerComponent } from '@components/colorPicker/ColorPicker';
import { ModalLongButton } from '@components/modals/ModalLongButton';
import { screenWidth480px } from '@constants/constants';
import { faPalette } from '@fortawesome/free-solid-svg-icons/faPalette';
import { useStyles } from '@hooks/useStyles';
import { selectAccentColorButtonStyles } from '@screens/accountScreen/buttons/selectAccentColorButton/styles';
import { SelectAccentColorButtonPropsType } from '@screens/accountScreen/buttons/selectAccentColorButton/types';
import { changeAccentColorAction } from '@store/actions/userSagaActions/changeAccentColorAction';
import { ColorType } from '@store/reducers/userReducer/types';
import { accentColorSelector } from '@store/selectors/userSelectors';
import { useTranslation } from 'react-i18next';
import { useWindowDimensions, View } from 'react-native';
import 'react-native-get-random-values';
import { useDispatch, useSelector } from 'react-redux';

export const SelectAccentColorButton = (props: SelectAccentColorButtonPropsType) => {
  const { setIsLoading } = props;

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const styles = useStyles(selectAccentColorButtonStyles);

  const initialAccentColor = useSelector(accentColorSelector);

  const [color, setColor] = useState<ColorType>(initialAccentColor);

  const { width: appWidth } = useWindowDimensions();

  const colorPickerGapSizeOnNarrowScreen = 0;
  const colorPickerGapSizeOnOtherScreens = 20;

  const colorPickerGapSize =
    appWidth <= screenWidth480px
      ? colorPickerGapSizeOnNarrowScreen
      : colorPickerGapSizeOnOtherScreens;

  const setAccentColor = () => {
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
      rightComponent={<View style={styles.colorIndicator} />}
    >
      <ColorPickerComponent
        color={color}
        gapSize={colorPickerGapSize}
        marginTop={10}
        setSelectedColor={setColor}
      />
    </ModalLongButton>
  );
};
