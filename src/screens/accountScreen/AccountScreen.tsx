import {CustomTextButton} from '@components/common/buttons/CustomTextButton';
import {Loader} from '@components/common/loader/loader';
import {ModalText} from '@components/common/modals/ModalText';
import {EN, ENGLISH, RU, RUSSIAN} from '@constants/constants';
import {styles} from '@root/screens/accountScreen/styles';
import {changeLanguageAction} from '@store/actions/userSagaActions/changeLanguageAction';
import {deleteAccountAction} from '@store/actions/userSagaActions/deleteAccountAction';
import {signOutAction} from '@store/actions/userSagaActions/signOutAction';
import {
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
  const [waitingProcess, setWaitingProcess] = useState<boolean>(false);

  const changeLanguage = (language: string) => {
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
      <View style={styles.screenContainer}>
        {userAvatar && (
          <Image source={{uri: userAvatar}} style={styles.avatar} />
        )}
        {userData.displayName && (
          <Text style={styles.name}>{userData.displayName}</Text>
        )}
        {userData.email && <Text style={styles.text}>{userData.email}</Text>}
        {userData.phoneNumber && (
          <Text style={styles.text}>{userData.phoneNumber}</Text>
        )}
        <View style={styles.buttonsContainer}>
          <CustomTextButton
            onPress={() => changeLanguage(EN)}
            title={ENGLISH}
            containerStyle={styles.buttonContainer}
          />
          <CustomTextButton
            onPress={() => changeLanguage(RU)}
            title={RUSSIAN}
            containerStyle={styles.buttonContainer}
          />
        </View>
        <ModalText
          okHandler={signOutHandler}
          description={t('signInScreen.SignOutWarning')}
          buttonTitle={t('signInScreen.SignOut')}
          buttonStyle={styles.buttonContainer}
          disable={waitingProcess}
        />
        <ModalText
          okHandler={deleteAccountHandler}
          description={t('signInScreen.DeleteAccountWarning')}
          buttonTitle={t('signInScreen.DeleteAccount')}
          buttonStyle={styles.buttonContainer}
          disable={waitingProcess}
        />
      </View>
    );
  }

  return <Loader />;
};
