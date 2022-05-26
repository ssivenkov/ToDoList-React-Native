import {Loader} from '@components/common/loader/loader';
import {FACEBOOK_TITLE, GOOGLE_TITLE} from '@constants/constants';
import {faFacebook, faGoogle} from '@fortawesome/free-brands-svg-icons';
import {SignInButton} from '@root/screens/signInScreen/signInButton/SignInButton';
import {signInStyles} from '@root/screens/signInScreen/signInButton/styles';
import {FacebookSignInAction} from '@store/actions/userSagaActions/FacebookSignInAction';
import {GoogleSignInAction} from '@store/actions/userSagaActions/GoogleSignInAction';
import {themeSelector} from '@store/selectors/userSelectors';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';

export const SignInScreen = () => {
  const dispatch = useDispatch();

  const {t} = useTranslation();

  const theme = useSelector(themeSelector);
  const [waitingUserData, setWaitingUserData] = useState<boolean>(false);

  const onGoogleButtonPress = (): void => {
    dispatch(GoogleSignInAction({setWaitingUserData}));
  };

  const onFacebookButtonPress = (): void => {
    dispatch(FacebookSignInAction({setWaitingUserData}));
  };

  if (waitingUserData) {
    return <Loader />;
  }

  return (
    <View style={styles(theme).signInWrapper}>
      <View style={styles().signInContainer}>
        <Text style={styles(theme).screenTitle}>
          {t('signInScreen.SignIn')}
        </Text>
        <SignInButton
          onPress={onGoogleButtonPress}
          serviceTitle={GOOGLE_TITLE}
          icon={faGoogle}
          colorStyle={signInStyles.googleStyle}
          disabled={waitingUserData}
        />
        <SignInButton
          onPress={onFacebookButtonPress}
          serviceTitle={FACEBOOK_TITLE}
          icon={faFacebook}
          colorStyle={signInStyles.facebookStyle}
          disabled={waitingUserData}
        />
      </View>
    </View>
  );
};
