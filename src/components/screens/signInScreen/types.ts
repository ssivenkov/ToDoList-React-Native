import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {TFunction} from 'i18next';

import UserCredential = FirebaseAuthTypes.UserCredential;

export type SignInScreenPropsType = {
  t: TFunction;
  googleUserData: FirebaseAuthTypes.User | null;
  onGoogleButtonPress: () => Promise<UserCredential | null>;
  waitingGoogleUserData: boolean;
  onGoogleSignOutPress: () => void;
};
