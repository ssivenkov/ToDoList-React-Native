import {AUTH_ACTIONS} from '@enums/authEnum';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {
  SetAuthStatusActionType,
  SetUserDataActionType,
} from '@store/actions/authActions/types';

export const setAuthStatus = (
  authStatus: boolean,
): SetAuthStatusActionType => ({
  type: AUTH_ACTIONS.SET_AUTH_STATUS,
  authStatus,
});

export const setUserData = (
  userData: FirebaseAuthTypes.User | null,
): SetUserDataActionType => ({
  type: AUTH_ACTIONS.SET_USER_DATA,
  userData,
});
