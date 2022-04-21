import {AUTH_ACTIONS} from '@enums/authEnum';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Nullable} from '@root/types/common/types';
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
  userData: Nullable<FirebaseAuthTypes.User>,
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
