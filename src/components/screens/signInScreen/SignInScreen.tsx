import {SignInButton} from '@components/screens/signInScreen/signInButton/SignInButton';
import {signInStyles} from '@components/screens/signInScreen/signInButton/styles';
import {FacebookTitle, GoogleTitle} from '@constants/constants';
import {faFacebook, faGoogle} from '@fortawesome/free-brands-svg-icons';
import {errorAlert} from '@root/helpers/Alert';
import {
  FacebookSignInSaga,
  GoogleSignInSaga,
} from '@store/actions/authSagaActions/authSagaActions';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {styles} from './styles';

export const SignInScreen = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [waitingUserData, setWaitingUserData] = useState<boolean>(false);

  const onGoogleButtonPress = () => {
    try {
      dispatch(GoogleSignInSaga({setWaitingUserData}));
    } catch (error) {
      if (error instanceof Error) errorAlert(error);
    } finally {
      setWaitingUserData(false);
    }
  };

  const onFacebookButtonPress = () => {
    try {
      dispatch(FacebookSignInSaga({setWaitingUserData}));
    } catch (error) {
      if (error instanceof Error) errorAlert(error);
    } finally {
      setWaitingUserData(false);
    }
  };

  return (
    <View style={styles.signInWrapper}>
      <View style={styles.signInContainer}>
        <Text style={styles.screenTitle}>{t('signInScreen.SignIn')}</Text>
        <SignInButton
          onPress={onGoogleButtonPress}
          serviceTitle={GoogleTitle}
          icon={faGoogle}
          buttonColorStyle={signInStyles.googleStyle}
          disabled={waitingUserData}
        />
        <SignInButton
          onPress={onFacebookButtonPress}
          serviceTitle={FacebookTitle}
          icon={faFacebook}
          buttonColorStyle={signInStyles.facebookStyle}
          disabled={waitingUserData}
        />
      </View>
    </View>
  );
};
