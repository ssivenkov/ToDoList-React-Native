import { ReactNativeFirebase } from '@react-native-firebase/app';

export type SignInWithEmailErrorType = ReactNativeFirebase.NativeFirebaseError & {
  jsStack?: string;
  stack?: string;
  userInfo?: {
    code?: string;
    message?: string;
  };
};

export type RegisterWithEmailErrorType = SignInWithEmailErrorType;
