import {AUTH_ACTIONS} from '@enums/authEnum';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {
  SetAuthStateActionType,
  SetAuthStatusActionType,
  SetUserDataActionType,
} from '@store/actions/authActions/types';
import {InitialAuthStateType} from '@store/reducers/authReducer/types';

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

export const setAuthState = (
  authState: InitialAuthStateType,
): SetAuthStateActionType => ({
  type: AUTH_ACTIONS.SET_AUTH_STATE,
  authState,
});
