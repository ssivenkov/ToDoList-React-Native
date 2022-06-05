import {ColorPickerButton} from '@components/buttons/colorPickerButton/ColorPickerButton';
import {CustomTextButton} from '@components/common/buttons/CustomTextButton';
import {Loader} from '@components/common/loader/Loader';
import {ModalText} from '@components/common/modals/ModalText';
import {Switcher} from '@components/common/switcher/Switcher';
import {EN, ENGLISH, RU, RUSSIAN} from '@constants/constants';
import {useStyles} from '@root/hooks/useStyles';
import {styles} from '@root/screens/accountScreen/styles';
import {darkTheme, lightTheme} from '@root/themes/theme';
import {setAccentColorAction} from '@store/actions/userReducerActions/setAccentColorAction';
import {setThemeAction} from '@store/actions/userReducerActions/setThemeAction';
import {changeLanguageAction} from '@store/actions/userSagaActions/changeLanguageAction';
import {deleteAccountAction} from '@store/actions/userSagaActions/deleteAccountAction';
import {signOutAction} from '@store/actions/userSagaActions/signOutAction';
import {AccentColorType, LanguageType} from '@store/reducers/userReducer/types';
import {
  themeSelector,
  userAvatarSelector,
  userDataSelector,
} from '@store/selectors/userSelectors';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, ScrollView, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const AccountScreen = () => {
  const dispatch = useDispatch();
  const style = useStyles(styles);
  const {t} = useTranslation();

  const userData = useSelector(userDataSelector);
  const userAvatar = useSelector(userAvatarSelector);
  const theme = useSelector(themeSelector);
  const [waitingProcess, setWaitingProcess] = useState<boolean>(false);

  const changeTheme = (isDarkMode: boolean) => {
    if (isDarkMode) {
      dispatch(setThemeAction({theme: darkTheme}));
    } else dispatch(setThemeAction({theme: lightTheme}));
  };

  const setAccentColor = (accentColor: AccentColorType): void => {
    dispatch(setAccentColorAction({accentColor}));
  };

  const changeLanguage = (language: LanguageType) => {
    dispatch(changeLanguageAction({language}));
  };

  const signOutHandler = (): void => {
    dispatch(signOutAction({setWaitingProcess}));
  };

  const deleteAccountHandler = (): void => {
    dispatch(deleteAccountAction({setWaitingProcess}));
  };

  if (userData && !waitingProcess) {
    return (
      <ScrollView>
        <View style={style.screenContainer}>
          {userAvatar && (
            <Image source={{uri: userAvatar}} style={style.avatar} />
          )}
          {userData.displayName && (
            <Text style={style.name}>{userData.displayName}</Text>
          )}
          {userData.email && <Text style={style.text}>{userData.email}</Text>}
          {userData.phoneNumber && (
            <Text style={style.text}>{userData.phoneNumber}</Text>
          )}
          <Switcher
            isOn={theme.darkMode}
            size={'large'}
            switcherText={t('accountScreen.DarkMode')}
            onToggleSwitcherClick={changeTheme}
            containerStyle={style.buttonsContainer}
            textStyle={style.text}
            textMargin={6}
          />
          <ColorPickerButton
            setAccentColor={setAccentColor}
            description={'accountScreen.AccentColorDescription'}
            buttonTitle={'accountScreen.AccentColorButtonTitle'}
            containerStyle={style.buttonsContainer}
          />
          <View style={style.buttonsContainer}>
            <CustomTextButton
              onPress={() => changeLanguage(EN)}
              title={ENGLISH}
              containerStyle={style.buttonContainer}
            />
            <CustomTextButton
              onPress={() => changeLanguage(RU)}
              title={RUSSIAN}
              containerStyle={style.buttonContainer}
            />
          </View>
          <ModalText
            okHandler={signOutHandler}
            description={t('accountScreen.SignOutWarning')}
            buttonTitle={t('accountScreen.SignOut')}
            buttonContainerStyle={style.buttonsContainer}
            disable={waitingProcess}
          />
          <ModalText
            okHandler={deleteAccountHandler}
            description={t('accountScreen.DeleteAccountWarning')}
            buttonTitle={t('accountScreen.DeleteAccount')}
            buttonContainerStyle={style.buttonsContainer}
            disable={waitingProcess}
          />
        </View>
      </ScrollView>
    );
  }

  return <Loader />;
};
