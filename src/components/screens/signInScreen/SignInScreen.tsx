import {CustomTextButton} from '@components/common/buttons/CustomTextButton';
import {SignInButton} from '@components/screens/signInScreen/SignInButton/SignInButton';
import {signInStyles} from '@components/screens/signInScreen/SignInButton/styles';
import {SignInScreenPropsType} from '@components/screens/signInScreen/types';
import {FacebookTitle, GoogleTitle} from '@constants/constants';
import {faFacebook, faGoogle} from '@fortawesome/free-brands-svg-icons';
import React from 'react';
import {Image, Text, View} from 'react-native';
import {LoginButton, AccessToken} from 'react-native-fbsdk-next';
import {styles} from './styles';

export const SignInScreenView = (props: SignInScreenPropsType) => {
  const {
    t,
    googleUserData,
    onGoogleButtonPress,
    waitingGoogleUserData,
    onGoogleSignOutPress,
  } = props;

  if (!googleUserData) {
    return (
      <View style={styles.signInContainer}>
        <Text style={styles.screenTitle}>{t('signInScreen.SignIn')}</Text>
        <SignInButton
          onPress={onGoogleButtonPress}
          serviceTitle={GoogleTitle}
          icon={faGoogle}
          buttonColorStyle={signInStyles.googleStyle}
          disabled={waitingGoogleUserData && !googleUserData}
        />
        <SignInButton
          onPress={onGoogleButtonPress}
          serviceTitle={FacebookTitle}
          icon={faFacebook}
          buttonColorStyle={signInStyles.facebookStyle}
          disabled={waitingGoogleUserData && !googleUserData}
        />
        <LoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              console.log('login has error: ' + error);
            } else if (result.isCancelled) {
              console.log('login is cancelled.');
            } else {
              AccessToken.getCurrentAccessToken().then((data) => {
                if (data) {
                  console.log(data.accessToken.toString());
                  console.log('Facebook login success');
                }
              });
            }
          }}
          onLogoutFinished={() => console.log('Facebook logout')}
        />
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>{googleUserData.displayName}</Text>
      {googleUserData.photoURL && (
        <Image source={{uri: googleUserData.photoURL}} style={styles.avatar} />
      )}
      <CustomTextButton
        title={'Sign out'}
        onPress={onGoogleSignOutPress}
        disable={!googleUserData}
      />
    </View>
  );
};
