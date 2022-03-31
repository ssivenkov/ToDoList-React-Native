import {SignInScreenView} from '@components/screens/signInScreen/SignInScreenView';
import {useFacebook} from '@components/screens/signInScreen/hooks/useFacebook';
import {useGoogle} from '@components/screens/signInScreen/hooks/useGoole';
import React from 'react';
import {useTranslation} from 'react-i18next';

export const SignInScreen = () => {
  const {t} = useTranslation();

  const {
    googleSignOut,
    onGoogleButtonPress,
    googleUserData,
    waitingGoogleUserData,
  } = useGoogle();

  const {
    facebookSignOut,
    onFacebookButtonPress,
    facebookUserData,
    waitingFacebookUserData,
  } = useFacebook();

  return (
    <SignInScreenView
      t={t}
      onGoogleSignOutPress={googleSignOut}
      onFacebookSignOutPress={facebookSignOut}
      onGoogleButtonPress={onGoogleButtonPress}
      onFacebookButtonPress={onFacebookButtonPress}
      googleUserData={googleUserData}
      facebookUserData={facebookUserData}
      waitingGoogleUserData={waitingGoogleUserData}
      waitingFacebookUserData={waitingFacebookUserData}
    />
  );
};
