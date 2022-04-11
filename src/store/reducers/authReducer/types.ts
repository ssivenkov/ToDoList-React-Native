import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export type InitialAuthStateType = {
  authStatus: boolean;
  userData: FirebaseAuthTypes.User | null;
};
