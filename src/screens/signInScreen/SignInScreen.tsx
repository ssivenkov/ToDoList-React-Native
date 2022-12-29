import React, { useState } from 'react';

import { signInScreenGradient } from '@colors/gradients';
import { Loader } from '@components/common/loader/Loader';
import { FACEBOOK_TITLE, GOOGLE_TITLE } from '@constants/constants';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useStyles } from '@root/hooks/useStyles';
import { SignInButton } from '@root/screens/signInScreen/signInButton/SignInButton';
import { signInStyles } from '@root/screens/signInScreen/signInButton/styles';
import { facebookSignInAction } from '@store/actions/userSagaActions/FacebookSignInAction';
import { googleSignInAction } from '@store/actions/userSagaActions/GoogleSignInAction';
import { useTranslation } from 'react-i18next';
import { Image, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';

import { styles } from './styles';

export const SignInScreen = () => {
  const dispatch = useDispatch();

  const style = useStyles(styles);

  const { t } = useTranslation();

  const [waitingUserData, setWaitingUserData] = useState<boolean>(false);

  const isDeveloperMode = __DEV__;

  const onGoogleButtonPress = (): void => {
    dispatch(googleSignInAction({ setWaitingUserData }));
  };

  const onFacebookButtonPress = (): void => {
    dispatch(facebookSignInAction({ setWaitingUserData }));
  };

  return (
    <LinearGradient colors={signInScreenGradient}>
      <View style={style.signInWrapper}>
        {waitingUserData ? (
          <Loader />
        ) : (
          <View style={style.signInContainer}>
            <Image
              source={require('../../assets/images/icons/appIcon.png')}
              style={style.appIcon}
            />
            <Text style={style.screenTitle}>{t('signInScreen.SignIn')}</Text>
            <SignInButton
              colorStyle={signInStyles.googleStyle}
              disabled={waitingUserData}
              icon={faGoogle}
              onPress={onGoogleButtonPress}
              serviceTitle={GOOGLE_TITLE}
            />
            {isDeveloperMode && (
              <SignInButton
                colorStyle={signInStyles.facebookStyle}
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
