import React from 'react';

import { signInScreenGradient } from '@colors/gradients';
import { PurpleLoader } from '@components/loaders/purpleLoader/PurpleLoader';
import { FIREBASE_OTHER } from '@enums/firebaseEnum';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
import { useStyles } from '@hooks/useStyles';
import { SignInButton } from '@screens/signInScreen/buttons/signInButton/SignInButton';
import { signInButtonStyles } from '@screens/signInScreen/buttons/signInButton/styles';
import { facebookSignInAction } from '@store/actions/userSagaActions/FacebookSignInAction';
import { googleSignInAction } from '@store/actions/userSagaActions/GoogleSignInAction';
import { isWaitingUserDataOnSignInSelector } from '@store/selectors/userSelectors';
import { useTranslation } from 'react-i18next';
import { Image, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

import { signInScreenStyles } from './styles';

export const SignInScreen = () => {
  const { GOOGLE_TITLE, FACEBOOK_TITLE } = FIREBASE_OTHER;

  const dispatch = useDispatch();

  const styles = useStyles(signInScreenStyles);

  const { t } = useTranslation();

  const waitingUserDataOnSignIn = useSelector(isWaitingUserDataOnSignInSelector);

  const isDeveloperMode = __DEV__;

  const onGoogleButtonPress = () => {
    dispatch(googleSignInAction());
  };

  const onFacebookButtonPress = () => {
    dispatch(facebookSignInAction());
  };

  return (
    <LinearGradient colors={signInScreenGradient}>
      <View style={styles.signInWrapper}>
        {waitingUserDataOnSignIn ? (
          <PurpleLoader />
        ) : (
          <View style={styles.signInContainer}>
            <Image
              source={require('../../assets/images/icons/appIcon.png')}
              style={styles.appIcon}
            />
            <Text style={styles.screenTitle}>{t('signInScreen.SignIn')}</Text>
            <SignInButton
              colorStyle={signInButtonStyles.googleStyle}
              disabled={waitingUserDataOnSignIn}
              icon={faGoogle}
              onPress={onGoogleButtonPress}
              serviceTitle={GOOGLE_TITLE}
            />
            {isDeveloperMode && (
              <SignInButton
                colorStyle={signInButtonStyles.facebookStyle}
                disabled={waitingUserDataOnSignIn}
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
