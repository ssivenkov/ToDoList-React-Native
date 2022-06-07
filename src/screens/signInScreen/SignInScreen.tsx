import {Loader} from '@components/common/loader/Loader';
import {FACEBOOK_TITLE, GOOGLE_TITLE} from '@constants/constants';
import {faFacebook, faGoogle} from '@fortawesome/free-brands-svg-icons';
import {useStyles} from '@root/hooks/useStyles';
import {SignInButton} from '@root/screens/signInScreen/signInButton/SignInButton';
import {signInStyles} from '@root/screens/signInScreen/signInButton/styles';
import {FacebookSignInAction} from '@store/actions/userSagaActions/FacebookSignInAction';
import {GoogleSignInAction} from '@store/actions/userSagaActions/GoogleSignInAction';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import {styles} from './styles';

export const SignInScreen = () => {
  const dispatch = useDispatch();
  const style = useStyles(styles);
  const {t} = useTranslation();

  const [waitingUserData, setWaitingUserData] = useState<boolean>(false);

  const isDeveloperMode = __DEV__;

  const onGoogleButtonPress = (): void => {
    dispatch(GoogleSignInAction({setWaitingUserData}));
  };

  const onFacebookButtonPress = (): void => {
    dispatch(FacebookSignInAction({setWaitingUserData}));
  };

  return (
    <LinearGradient colors={['#5A00FF', '#3412B1', '#000E32']}>
      <View style={style.signInWrapper}>
        {waitingUserData ? (
          <Loader />
        ) : (
          <View style={style.signInContainer}>
            <Image
              style={style.appIcon}
              source={require('../../assets/images/icons/appIcon.png')}
            />
            <Text style={style.screenTitle}>{t('signInScreen.SignIn')}</Text>
            <SignInButton
              onPress={onGoogleButtonPress}
              serviceTitle={GOOGLE_TITLE}
              icon={faGoogle}
              colorStyle={signInStyles.googleStyle}
              disabled={waitingUserData}
            />
            {isDeveloperMode && (
              <SignInButton
                onPress={onFacebookButtonPress}
                serviceTitle={FACEBOOK_TITLE}
                icon={faFacebook}
                colorStyle={signInStyles.facebookStyle}
                disabled={waitingUserData}
              />
            )}
          </View>
        )}
      </View>
    </LinearGradient>
  );
};
