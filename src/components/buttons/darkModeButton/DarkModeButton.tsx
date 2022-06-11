import {styles} from '@components/buttons/darkModeButton/styles';
import {DarkModeButtonButtonPropsType} from '@components/buttons/darkModeButton/types';
import {LongButton} from '@components/common/buttons/longButton/LongButton';
import {Switcher} from '@components/common/switcher/Switcher';
import {faMoon} from '@fortawesome/free-solid-svg-icons';
import {useStyles} from '@root/hooks/useStyles';
import {darkTheme, lightTheme} from '@root/themes/theme';
import {changeDarkModeAction} from '@store/actions/userSagaActions/changeDarkModeAction';
import {themeSelector} from '@store/selectors/userSelectors';
import React from 'react';
import {useTranslation} from 'react-i18next';
import 'react-native-get-random-values';
import {useDispatch, useSelector} from 'react-redux';

export const DarkModeButton = (props: DarkModeButtonButtonPropsType) => {
  const {setIsLoading} = props;

  const {t} = useTranslation();

  const dispatch = useDispatch();

  const style = useStyles(styles);

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
    } else
      dispatch(
        changeDarkModeAction({
          darkMode: true,
          setIsLoading,
          theme: darkTheme,
        }),
      );
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
    } else
      dispatch(
        changeDarkModeAction({
          darkMode: false,
          setIsLoading,
          theme: lightTheme,
        }),
      );
  };

  const switcher = (
    <Switcher
      isOn={theme.darkMode}
      size={'medium'}
      textStyle={style.text}
      onToggleSwitcherClick={changeThemeForSwitcher}
    />
  );

  return (
    <LongButton
      icon={faMoon}
      title={t('accountScreen.DarkMode')}
      onPress={() => changeTheme(theme.darkMode)}
      rightComponent={switcher}
    />
  );
};
