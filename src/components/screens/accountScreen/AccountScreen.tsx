import {CustomTextButton} from '@components/common/buttons/CustomTextButton';
import {styles} from '@components/screens/accountScreen/styles';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {errorAlert} from '@root/helpers/Alert';
import {signOutSaga} from '@store/actions/authSagaActions/authSagaActions';
import {AppRootStateType} from '@store/store';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const AccountScreen = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const userData = useSelector<AppRootStateType, FirebaseAuthTypes.User | null>(
    (state) => state.auth.userData,
  );

  const signOut = () => {
    try {
      dispatch(signOutSaga());
    } catch (error) {
      if (error instanceof Error) errorAlert(error);
    }
  };

  if (userData) {
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
        <View style={styles.buttonContainer}>
          <CustomTextButton
            title={t('signInScreen.SignOut')}
            onPress={signOut}
            disable={!userData}
          />
        </View>
      </View>
    );
  }

  return <Text>Loading...</Text>;
};
