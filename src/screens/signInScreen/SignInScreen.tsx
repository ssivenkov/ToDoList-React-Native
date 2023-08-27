import React, { useEffect } from 'react';

import AppLogo from '@assets/images/icons/appLogo.svg';
import { signInScreenGradient } from '@colors/gradients';
import { SignInButton } from '@components/buttons/signInButton/SignInButton';
import { signInButtonStyles } from '@components/buttons/signInButton/styles';
import { ChangeLanguageButton } from '@components/header/buttons/changeLanguageButton/ChangeLanguageButton';
import { Header } from '@components/header/Header';
import { PurpleLoader } from '@components/loaders/purpleLoader/PurpleLoader';
import { FIREBASE_OTHER } from '@enums/firebaseEnum';
import { SIGN_IN_NAVIGATOR_ROUTE } from '@enums/routesEnum';
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { useStyles } from '@hooks/useStyles';
import { SignInScreenPropsType } from '@navigation/signInNavigator/types';
import { setWaitingUserDataOnSignInAction } from '@store/actions/userReducerActions/setWaitingUserDataOnSignInAction';
import { facebookSignInAction } from '@store/actions/userSagaActions/FacebookSignInAction';
import { googleSignInAction } from '@store/actions/userSagaActions/GoogleSignInAction';
import { isWaitingUserDataOnSignInSelector } from '@store/selectors/userSelectors';
import { Trans, useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

import { signInScreenStyles } from './styles';

const { GOOGLE_TITLE } = FIREBASE_OTHER;

export const SignInScreen = ({ navigation }: SignInScreenPropsType) => {
  const dispatch = useDispatch();

  const styles = useStyles(signInScreenStyles);

  const { t } = useTranslation();

  const waitingUserDataOnSignIn = useSelector(isWaitingUserDataOnSignInSelector);

  const onGoogleButtonPress = () => {
    dispatch(googleSignInAction());
  };

  const onFacebookButtonPress = () => {
    dispatch(facebookSignInAction());
  };

  const navigateToSignInSelectOptionScreen = () => {
    navigation.navigate(SIGN_IN_NAVIGATOR_ROUTE.SIGN_IN_SELECT_OPTION_SCREEN);
  };

  // disable waiting if app open again
  useEffect(() => {
    dispatch(setWaitingUserDataOnSignInAction({ isWaitingUserDataOnSignIn: false }));
  }, []);

  return (
    <LinearGradient colors={signInScreenGradient} style={styles.linearGradient}>
      <ScrollView
        contentContainerStyle={
          waitingUserDataOnSignIn
            ? styles.signInScrollViewWithLoaderWrapper
            : styles.signInScrollViewWrapper
        }
        keyboardShouldPersistTaps='handled'
      >
        {waitingUserDataOnSignIn ? (
          <PurpleLoader />
        ) : (
          <View style={styles.signInContentWrapper}>
            <Header rightButton={<ChangeLanguageButton />} transparentBackground={true} />
            <View style={styles.signInContentContainer}>
              <AppLogo style={styles.appLogoSvg} />
              <Text style={styles.screenTitle}>{t('signInNavigator.SignIn')}</Text>
              <View style={styles.signInServicesButtonsContainer}>
                <SignInButton
                  colorStyle={signInButtonStyles.google}
                  disabled={waitingUserDataOnSignIn}
                  icon={faGoogle}
                  onPress={onGoogleButtonPress}
                  text={
                    <Trans i18nKey='signInNavigator.SignInWithButtonTitle'>
                      {GOOGLE_TITLE}
                    </Trans>
                  }
                />
                {/*<SignInButton
                  colorStyle={signInButtonStyles.facebook}
                  disabled={waitingUserDataOnSignIn}
                  icon={faFacebook}
                  onPress={onFacebookButtonPress}
                  text={
                    <Trans i18nKey='signInNavigator.SignInWithButtonTitle'>
                      {FACEBOOK_TITLE}
                    </Trans>
                  }
                />*/}
                <SignInButton
                  colorStyle={signInButtonStyles.email}
                  disabled={waitingUserDataOnSignIn}
                  icon={faEnvelope}
                  onPress={navigateToSignInSelectOptionScreen}
                  text={
                    <Trans i18nKey='signInNavigator.SignInWithButtonTitle'>
                      {t('signInNavigator.EmailAnotherDeclension')}
                    </Trans>
                  }
                />
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
};
