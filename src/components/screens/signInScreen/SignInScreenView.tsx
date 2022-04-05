import {SignInButton} from '@components/screens/signInScreen/SignInButton/SignInButton';
import {signInStyles} from '@components/screens/signInScreen/SignInButton/styles';
import {UserScreen} from '@components/screens/signInScreen/UserScreen/UserScreen';
import {SignInScreenViewPropsType} from '@components/screens/signInScreen/types';
import {FacebookTitle, GoogleTitle} from '@constants/constants';
import {faFacebook, faGoogle} from '@fortawesome/free-brands-svg-icons';
import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';

export const SignInScreenView = (props: SignInScreenViewPropsType) => {
  const {
    t,
    googleUserData,
    facebookUserData,
    onGoogleButtonPress,
    onFacebookButtonPress,
    waitingGoogleUserData,
    waitingFacebookUserData,
    onGoogleSignOutPress,
    onFacebookSignOutPress,
  } = props;

  if (googleUserData) {
    return (
      <UserScreen
        userData={googleUserData}
        signOutCallback={onGoogleSignOutPress}
      />
    );
  }

  if (facebookUserData) {
    return (
      <UserScreen
        userData={facebookUserData}
        signOutCallback={onFacebookSignOutPress}
      />
    );
  }

  return (
    <View style={styles.signInContainer}>
      <Text style={styles.screenTitle}>{t('signInScreen.SignIn')}</Text>
      <SignInButton
        onPress={onGoogleButtonPress}
        serviceTitle={GoogleTitle}
        icon={faGoogle}
        buttonColorStyle={signInStyles.googleStyle}
        disabled={waitingGoogleUserData}
      />
      <SignInButton
        onPress={onFacebookButtonPress}
        serviceTitle={FacebookTitle}
        icon={faFacebook}
        buttonColorStyle={signInStyles.facebookStyle}
        disabled={waitingFacebookUserData}
      />
    </View>
  );
};
