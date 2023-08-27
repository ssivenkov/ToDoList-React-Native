import React from 'react';

import AppLogo from '@assets/images/icons/appLogo.svg';
import { signInScreenGradient } from '@colors/gradients';
import { SignInButton } from '@components/buttons/signInButton/SignInButton';
import { signInButtonStyles } from '@components/buttons/signInButton/styles';
import { ChangeLanguageButton } from '@components/header/buttons/changeLanguageButton/ChangeLanguageButton';
import { GoBackButton } from '@components/header/buttons/goBackButton/GoBackButton';
import { Header } from '@components/header/Header';
import { PurpleLoader } from '@components/loaders/purpleLoader/PurpleLoader';
import { SIGN_IN_NAVIGATOR_ROUTE } from '@enums/routesEnum';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons/faSignInAlt';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { useStyles } from '@hooks/useStyles';
import { SignInSelectOptionScreenPropsType } from '@navigation/signInNavigator/types';
import { signInScreenStyles } from '@screens/signInScreen/styles';
import { isWaitingUserDataOnSignInSelector } from '@store/selectors/userSelectors';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

export const SignInSelectOptionScreen = ({
  navigation,
}: SignInSelectOptionScreenPropsType) => {
  const styles = useStyles(signInScreenStyles);

  const { t } = useTranslation();

  const waitingUserDataOnSignIn = useSelector(isWaitingUserDataOnSignInSelector);

  const navigateToSignInScreen = () => {
    navigation.navigate(SIGN_IN_NAVIGATOR_ROUTE.SIGN_IN_OPTION_SCREEN);
  };

  const navigateToRegisterScreen = () => {
    navigation.navigate(SIGN_IN_NAVIGATOR_ROUTE.REGISTER_OPTION_SCREEN);
  };

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
            <Header
              leftButton={<GoBackButton />}
              rightButton={<ChangeLanguageButton />}
              transparentBackground={true}
            />
            <View style={styles.signInContentContainer}>
              <AppLogo style={styles.appLogoSvg} />
              <Text style={styles.screenTitle}>
                {t('signInNavigator.SignInWithEmail')}
              </Text>
              <View style={styles.signInServicesButtonsContainer}>
                <SignInButton
                  colorStyle={signInButtonStyles.email}
                  disabled={waitingUserDataOnSignIn}
                  icon={faSignInAlt}
                  onPress={navigateToSignInScreen}
                  text={t('signInNavigator.SignIn')}
                />
                <SignInButton
                  colorStyle={signInButtonStyles.email}
                  disabled={waitingUserDataOnSignIn}
                  icon={faUser}
                  onPress={navigateToRegisterScreen}
                  text={t('signInNavigator.RegisterAndSignIn')}
                />
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
};
