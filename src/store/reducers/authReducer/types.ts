import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export type UserDataType = FirebaseAuthTypes.User | null;

export type InitialAuthStateType = {
  authStatus: boolean;
  userData: UserDataType;
};
