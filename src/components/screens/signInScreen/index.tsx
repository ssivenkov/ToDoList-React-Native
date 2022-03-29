import {SignInScreenView} from '@components/screens/signInScreen/SignInScreen';
import {useGoogle} from '@components/screens/signInScreen/hooks/useGoole';
import React from 'react';
import {useTranslation} from 'react-i18next';

export const SignInScreen = () => {
  const {t} = useTranslation();
  const {googleSignOut, onGoogleButtonPress, googleUserData, waitingUserData} =
    useGoogle();

  return (
    <SignInScreenView
      t={t}
      onGoogleSignOutPress={googleSignOut}
      onGoogleButtonPress={onGoogleButtonPress}
      googleUserData={googleUserData}
      waitingGoogleUserData={waitingUserData}
    />
  );
};
