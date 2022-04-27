import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Nullable} from '@root/types/common/types';
import {AppRootStateType} from '@store/store';

export const getUserAuthStatus = (state: AppRootStateType): boolean => {
  return state.auth.authStatus;
};

export const getUserData = (
  state: AppRootStateType,
): Nullable<FirebaseAuthTypes.User> => {
  return state.auth.userData;
};

export const getChannelID = (state: AppRootStateType): string => {
  return state.auth.channelID;
};
