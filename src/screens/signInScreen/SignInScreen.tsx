import React, { useState } from 'react';

import { signInScreenGradient } from '@colors/gradients';
import { Loader } from '@components/loader/Loader';
import { FIREBASE_OTHER } from '@enums/firebaseEnum';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
import { useStyles } from '@hooks/useStyles';
import { SignInButton } from '@screens/signInScreen/buttons/signInButton/SignInButton';
import { signInButtonStyles } from '@screens/signInScreen/buttons/signInButton/styles';
import { facebookSignInAction } from '@store/actions/userSagaActions/FacebookSignInAction';
import { googleSignInAction } from '@store/actions/userSagaActions/GoogleSignInAction';
import { useTranslation } from 'react-i18next';
import { Image, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';

import { signInScreenStyles } from './styles';

export const SignInScreen = () => {
  const { GOOGLE_TITLE, FACEBOOK_TITLE } = FIREBASE_OTHER;

  const dispatch = useDispatch();

  const styles = useStyles(signInScreenStyles);

  const { t } = useTranslation();

  const [waitingUserData, setWaitingUserData] = useState<boolean>(false);

  const isDeveloperMode = __DEV__;

  const onGoogleButtonPress = () => {
    dispatch(googleSignInAction({ setWaitingUserData }));
  };

  const onFacebookButtonPress = () => {
    dispatch(facebookSignInAction({ setWaitingUserData }));
  };

  return (
    <LinearGradient colors={signInScreenGradient}>
      <View style={styles.signInWrapper}>
        {waitingUserData ? (
          <Loader />
        ) : (
          <View style={styles.signInContainer}>
            <Image
              source={require('../../assets/images/icons/appIcon.png')}
              style={styles.appIcon}
            />
            <Text style={styles.screenTitle}>{t('signInScreen.SignIn')}</Text>
            <SignInButton
              colorStyle={signInButtonStyles.googleStyle}
              disabled={waitingUserData}
              icon={faGoogle}
              onPress={onGoogleButtonPress}
              serviceTitle={GOOGLE_TITLE}
            />
            {isDeveloperMode && (
              <SignInButton
                colorStyle={signInButtonStyles.facebookStyle}
                disabled={waitingUserData}
                icon={faFacebook}
                onPress={onFacebookButtonPress}
                serviceTitle={FACEBOOK_TITLE}
              />
            )}
          </View>
        )}
      </View>
    </LinearGradient>
  );
};
