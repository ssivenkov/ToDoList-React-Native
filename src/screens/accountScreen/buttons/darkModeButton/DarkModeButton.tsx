import React from 'react';

import { LongButton } from '@components/buttons/longButton/LongButton';
import { Switcher } from '@components/switcher/Switcher';
import { faMoon } from '@fortawesome/free-solid-svg-icons/faMoon';
import { useStyles } from '@hooks/useStyles';
import { changeDarkModeAction } from '@store/actions/userSagaActions/changeDarkModeAction';
import { themeSelector } from '@store/selectors/userSelectors';
import { darkTheme, lightTheme } from '@themes/themes';
import { useTranslation } from 'react-i18next';
import 'react-native-get-random-values';
import { useDispatch, useSelector } from 'react-redux';

import { darkModeButtonStyles } from './styles';
import { DarkModeButtonPropsType } from './types';

export const DarkModeButton = (props: DarkModeButtonPropsType) => {
  const { setIsLoading } = props;

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const styles = useStyles(darkModeButtonStyles);

  const theme = useSelector(themeSelector);

  const changeTheme = (isDarkMode: boolean) => {
    if (isDarkMode) {
      dispatch(
        changeDarkModeAction({
          darkMode: false,
          setIsLoading,
          theme: lightTheme,
        }),
      );
    } else {
      dispatch(
        changeDarkModeAction({
          darkMode: true,
          setIsLoading,
          theme: darkTheme,
        }),
      );
    }
  };

  const changeThemeForSwitcher = (isDarkMode: boolean) => {
    if (isDarkMode) {
      dispatch(
        changeDarkModeAction({
          darkMode: true,
          setIsLoading,
          theme: darkTheme,
        }),
      );
    } else {
      dispatch(
        changeDarkModeAction({
          darkMode: false,
          setIsLoading,
          theme: lightTheme,
        }),
      );
    }
  };

  return (
    <LongButton
      icon={faMoon}
      onPress={() => changeTheme(theme.darkMode)}
      rightComponent={
        <Switcher
          isOn={theme.darkMode}
          onToggleSwitcherClick={changeThemeForSwitcher}
          size='medium'
          textStyle={styles.text}
        />
      }
      title={t('accountScreen.DarkMode')}
    />
  );
};
