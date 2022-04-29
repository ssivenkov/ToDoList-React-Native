import {Loader} from '@components/common/loader/loader';
import {SignInButton} from '@components/screens/signInScreen/signInButton/SignInButton';
import {signInStyles} from '@components/screens/signInScreen/signInButton/styles';
import {FacebookTitle, GoogleTitle} from '@constants/constants';
import {faFacebook, faGoogle} from '@fortawesome/free-brands-svg-icons';
import {FacebookSignIn} from '@store/actions/authSagaActions/FacebookSignIn';
import {GoogleSignIn} from '@store/actions/authSagaActions/GoogleSignIn';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {styles} from './styles';

export const SignInScreen = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [waitingUserData, setWaitingUserData] = useState<boolean>(false);

  const onGoogleButtonPress = (): void => {
    dispatch(GoogleSignIn({setWaitingUserData}));
  };

  const onFacebookButtonPress = (): void => {
    dispatch(FacebookSignIn({setWaitingUserData}));
  };

  if (waitingUserData) {
    return <Loader />;
  }

  return (
    <View style={styles.signInWrapper}>
      <View style={styles.signInContainer}>
        <Text style={styles.screenTitle}>{t('signInScreen.SignIn')}</Text>
        {waitingUserData ? (
          <Loader />
        ) : (
          <>
            <SignInButton
              onPress={onGoogleButtonPress}
              serviceTitle={GoogleTitle}
              icon={faGoogle}
              colorStyle={signInStyles.googleStyle}
              disabled={waitingUserData}
            />
            <SignInButton
              onPress={onFacebookButtonPress}
              serviceTitle={FacebookTitle}
              icon={faFacebook}
              colorStyle={signInStyles.facebookStyle}
              disabled={waitingUserData}
            />
          </>
        )}
      </View>
    </View>
  );
};
