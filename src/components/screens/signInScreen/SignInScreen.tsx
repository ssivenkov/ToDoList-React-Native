import {SignInButton} from '@components/screens/signInScreen/signInButton/SignInButton';
import {signInStyles} from '@components/screens/signInScreen/signInButton/styles';
import {FacebookTitle, GoogleTitle} from '@constants/constants';
import {faFacebook, faGoogle} from '@fortawesome/free-brands-svg-icons';
import {
  FacebookSignIn,
  GoogleSignIn,
} from '@store/actions/authSagaActions/authSagaActions';
import {getUserAuthStatus} from '@store/selectors/authSelectors';
import {AppRootStateType} from '@store/store';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';

export const SignInScreen = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const isUserAuth = useSelector<AppRootStateType, boolean>(getUserAuthStatus);
  const [waitingUserData, setWaitingUserData] = useState<boolean>(false);

  const onGoogleButtonPress = (): void => {
    dispatch(GoogleSignIn({setWaitingUserData}));
  };

  const onFacebookButtonPress = (): void => {
    dispatch(FacebookSignIn({setWaitingUserData}));
  };

  useEffect(() => {
    setWaitingUserData(false);
  }, [isUserAuth]);

  return (
    <View style={styles.signInWrapper}>
      <View style={styles.signInContainer}>
        <Text style={styles.screenTitle}>{t('signInScreen.SignIn')}</Text>
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
      </View>
    </View>
  );
};
