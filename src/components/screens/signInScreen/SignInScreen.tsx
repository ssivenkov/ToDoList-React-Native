import {SignInButton} from '@components/screens/signInScreen/signInButton/SignInButton';
import {signInStyles} from '@components/screens/signInScreen/signInButton/styles';
import {FacebookTitle, GoogleTitle} from '@constants/constants';
import {faFacebook, faGoogle} from '@fortawesome/free-brands-svg-icons';
import {useFacebook} from '@root/hooks/useFacebook';
import {useGoogle} from '@root/hooks/useGoogle';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import {styles} from './styles';

export const SignInScreen = () => {
  const {t} = useTranslation();
  const {onGoogleButtonPress, waitingGoogleUserData} = useGoogle();
  const {onFacebookButtonPress, waitingFacebookUserData} = useFacebook();

  return (
    <View style={styles.signInWrapper}>
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
    </View>
  );
};
