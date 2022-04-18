import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {AppRootStateType} from '@store/store';

export const getUserAuthStatus = (state: AppRootStateType): boolean => {
  return state.auth.authStatus;
};

export const getUserData = (
  state: AppRootStateType,
): FirebaseAuthTypes.User | null => {
  return state.auth.userData;
};
