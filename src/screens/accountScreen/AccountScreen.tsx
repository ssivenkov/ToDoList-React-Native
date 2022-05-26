import {CustomTextButton} from '@components/common/buttons/CustomTextButton';
import {Loader} from '@components/common/loader/loader';
import {ModalText} from '@components/common/modals/ModalText';
import {Switcher} from '@components/common/switcher/Switcher';
import {EN, ENGLISH, RU, RUSSIAN} from '@constants/constants';
import {styles} from '@root/screens/accountScreen/styles';
import {darkTheme, lightTheme} from '@root/themes/theme';
import {setThemeAction} from '@store/actions/userReducerActions/setThemeAction';
import {changeLanguageAction} from '@store/actions/userSagaActions/changeLanguageAction';
import {deleteAccountAction} from '@store/actions/userSagaActions/deleteAccountAction';
import {signOutAction} from '@store/actions/userSagaActions/signOutAction';
import {LanguageType} from '@store/reducers/userReducer/types';
import {
  themeSelector,
  userAvatarSelector,
  userDataSelector,
} from '@store/selectors/userSelectors';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const AccountScreen = () => {
  const dispatch = useDispatch();

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
      <View style={styles(theme).screenContainer}>
        {userAvatar && (
          <Image source={{uri: userAvatar}} style={styles().avatar} />
        )}
        {userData.displayName && (
          <Text style={styles(theme).name}>{userData.displayName}</Text>
        )}
        {userData.email && (
          <Text style={styles(theme).text}>{userData.email}</Text>
        )}
        {userData.phoneNumber && (
          <Text style={styles(theme).text}>{userData.phoneNumber}</Text>
        )}
        <Switcher
          isOn={theme.darkMode}
          size={'large'}
          switcherText={t('accountScreen.DarkMode')}
          onToggleSwitcherClick={changeTheme}
          containerStyle={styles().buttonsContainer}
          textStyle={styles(theme).text}
          textMargin={6}
        />
        <View style={styles().buttonsContainer}>
          <CustomTextButton
            onPress={() => changeLanguage(EN)}
            title={ENGLISH}
            containerStyle={styles().buttonContainer}
          />
          <CustomTextButton
            onPress={() => changeLanguage(RU)}
            title={RUSSIAN}
            containerStyle={styles().buttonContainer}
          />
        </View>
        <ModalText
          okHandler={signOutHandler}
          description={t('accountScreen.SignOutWarning')}
          buttonTitle={t('accountScreen.SignOut')}
          buttonContainerStyle={styles().buttonsContainer}
          disable={waitingProcess}
        />
        <ModalText
          okHandler={deleteAccountHandler}
          description={t('accountScreen.DeleteAccountWarning')}
          buttonTitle={t('accountScreen.DeleteAccount')}
          buttonContainerStyle={styles().buttonsContainer}
          disable={waitingProcess}
        />
      </View>
    );
  }

  return <Loader />;
};
