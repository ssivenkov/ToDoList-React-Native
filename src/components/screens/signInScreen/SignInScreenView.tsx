import {CustomTextButton} from '@components/common/buttons/CustomTextButton';
import {SignInButton} from '@components/screens/signInScreen/SignInButton/SignInButton';
import {signInStyles} from '@components/screens/signInScreen/SignInButton/styles';
import {SignInScreenViewPropsType} from '@components/screens/signInScreen/types';
import {FacebookTitle, GoogleTitle} from '@constants/constants';
import {faFacebook, faGoogle} from '@fortawesome/free-brands-svg-icons';
import {AppRootStateType} from '@store/store';
import React from 'react';
import {Image, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from './styles';

export const SignInScreenView = (props: SignInScreenViewPropsType) => {
  const signInStatus = useSelector<AppRootStateType, string>(
    (state) => state.signIn.signInStatus,
  );

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

  const propsForRender: any = {};
  switch (signInStatus) {
    case 'Google': {
      if (googleUserData) {
        propsForRender.userName = googleUserData.displayName;
        propsForRender.userAvatar = googleUserData.photoURL;
        propsForRender.signOutButtonCallback = onGoogleSignOutPress;
        propsForRender.signOutButtonDisable = !googleUserData;
      }
      break;
    }
    case 'Facebook': {
      if (facebookUserData) {
        propsForRender.userName = facebookUserData.displayName;
        propsForRender.userAvatar = facebookUserData.photoURL;
        propsForRender.signOutButtonCallback = onFacebookSignOutPress;
        propsForRender.signOutButtonDisable = !facebookUserData;
      }
      break;
    }
    default:
      break;
  }

  if (!signInStatus) {
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
          onPress={onFacebookButtonPress}
          serviceTitle={FacebookTitle}
          icon={faFacebook}
          buttonColorStyle={signInStyles.facebookStyle}
          disabled={waitingFacebookUserData && !facebookUserData}
        />
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>{propsForRender.userName}</Text>
      <Image source={{uri: propsForRender.userAvatar}} style={styles.avatar} />
      <CustomTextButton
        title={'Sign out'}
        onPress={propsForRender.signOutButtonCallback}
        disable={propsForRender.signOutButtonDisable}
      />
    </View>
  );
};
