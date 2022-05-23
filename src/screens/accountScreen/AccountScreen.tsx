import {Loader} from '@components/common/loader/loader';
import {ModalText} from '@components/common/modals/ModalText';
import {styles} from '@root/screens/accountScreen/styles';
import {deleteAccountAction} from '@store/actions/authSagaActions/deleteAccountAction';
import {signOutAction} from '@store/actions/authSagaActions/signOutAction';
import {userDataSelector} from '@store/selectors/authSelectors';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const AccountScreen = () => {
  const dispatch = useDispatch();

  const {t} = useTranslation();

  const userData = useSelector(userDataSelector);
  const [waitingProcess, setWaitingProcess] = useState<boolean>(false);

  const signOutHandler = (): void => {
    dispatch(signOutAction({setWaitingProcess}));
  };

  const deleteAccountHandler = (): void => {
    dispatch(deleteAccountAction({setWaitingProcess}));
  };

  if (userData && !waitingProcess) {
    return (
      <View style={styles.screenContainer}>
        {userData.photoURL && (
          <Image source={{uri: userData.photoURL}} style={styles.avatar} />
        )}
        {userData.displayName && (
          <Text style={styles.name}>{userData.displayName}</Text>
        )}
        {userData.email && <Text style={styles.text}>{userData.email}</Text>}
        {userData.phoneNumber && (
          <Text style={styles.text}>{userData.phoneNumber}</Text>
        )}
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
