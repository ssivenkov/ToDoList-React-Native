import React, { useState } from 'react';

import AppLogo from '@assets/images/icons/appLogo.svg';
import { COLORS } from '@colors/colors';
import { signInScreenGradient } from '@colors/gradients';
import { SignInButton } from '@components/buttons/signInButton/SignInButton';
import { signInButtonStyles } from '@components/buttons/signInButton/styles';
import { GoBackButton } from '@components/header/buttons/goBackButton/GoBackButton';
import { Header } from '@components/header/Header';
import { Input } from '@components/inputs/Input';
import { PurpleLoader } from '@components/loaders/purpleLoader/PurpleLoader';
import { INPUT_MAX_LENGTH100, PASSWORD_MIN_LENGTH } from '@constants/constants';
import { EMAIL_REGEXP } from '@constants/regexps';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { useStyles } from '@hooks/useStyles';
import { signInScreenStyles } from '@screens/signInScreen/styles';
import { registerAndSignInWithEmailAction } from '@store/actions/userSagaActions/registerAndSignInWithEmailAction';
import { isWaitingUserDataOnSignInSelector } from '@store/selectors/userSelectors';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

const { WHITE } = COLORS;

export const RegisterOptionScreen = () => {
  const dispatch = useDispatch();
  const styles = useStyles(signInScreenStyles);

  const { t } = useTranslation();

  const waitingUserDataOnSignIn = useSelector(isWaitingUserDataOnSignInSelector);

  const [form, setForm] = useState({ email: '', password: '' });
  const { email, password } = form;

  const formSubmitButtonDisabledCondition =
    waitingUserDataOnSignIn ||
    !EMAIL_REGEXP.test(email) ||
    password.length < PASSWORD_MIN_LENGTH;

  const onSendingFormButtonPress = () => {
    dispatch(registerAndSignInWithEmailAction({ email, password }));
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
            <Header leftButton={<GoBackButton />} transparentBackground={true} />
            <View style={styles.signInContentContainer}>
              <AppLogo style={styles.appLogoSvg} />
              <Text style={styles.screenTitle}>{t('signInNavigator.Registration')}</Text>
              <View style={styles.formContainer}>
                <View style={styles.inputWrapper}>
                  <Input
                    additionalTextAndClearButtonColor={WHITE}
                    maxLength={INPUT_MAX_LENGTH100}
                    onChangeText={(value) => setForm({ email: value, password })}
                    suptext={t('signInNavigator.Email')}
                    value={form.email}
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Input
                    additionalTextAndClearButtonColor={WHITE}
                    maxLength={INPUT_MAX_LENGTH100}
                    onChangeText={(value) => setForm({ email, password: value })}
                    subtext={t('signInNavigator.PasswordSubtext')}
                    suptext={t('signInNavigator.Password')}
                    value={form.password}
                  />
                </View>
                <View style={styles.submitButtonContainer}>
                  <SignInButton
                    colorStyle={signInButtonStyles.email}
                    disabled={formSubmitButtonDisabledCondition}
                    icon={faUser}
                    onPress={onSendingFormButtonPress}
                    text={t('signInNavigator.RegisterAndSignIn')}
                  />
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
};
