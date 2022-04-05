import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {TFunction} from 'i18next';

export type SignInScreenViewPropsType = {
  t: TFunction;
  googleUserData: FirebaseAuthTypes.User | null;
  facebookUserData: FirebaseAuthTypes.User | null;
  onGoogleButtonPress: () => void;
  onFacebookButtonPress: () => void;
  waitingGoogleUserData: boolean;
  waitingFacebookUserData: boolean;
  onGoogleSignOutPress: () => void;
  onFacebookSignOutPress: () => void;
};
