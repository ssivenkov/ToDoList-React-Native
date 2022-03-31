import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {TFunction} from 'i18next';

import UserCredential = FirebaseAuthTypes.UserCredential;

export type SignInScreenViewPropsType = {
  t: TFunction;
  googleUserData: FirebaseAuthTypes.User | null;
  facebookUserData: FirebaseAuthTypes.User | null;
  onGoogleButtonPress: () => Promise<UserCredential | null>;
  onFacebookButtonPress: () => Promise<UserCredential | null>;
  waitingGoogleUserData: boolean;
  waitingFacebookUserData: boolean;
  onGoogleSignOutPress: () => void;
  onFacebookSignOutPress: () => void;
};
