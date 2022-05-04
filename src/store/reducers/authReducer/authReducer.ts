import {AUTH_ACTION} from '@enums/authEnum';
import {SetAuthStateActionReturnType} from '@store/actions/authReducerActions/setAuthStateAction';
import {SetChannelIDActionReturnType} from '@store/actions/authReducerActions/setChannelIDAction';
import {SetUserDataActionReturnType} from '@store/actions/authReducerActions/setUserDataAction';
import {SetUserIDActionReturnType} from '@store/actions/authReducerActions/setUserIDAction';
import {AuthStateType} from '@store/reducers/authReducer/types';

export type AuthActionsType =
  | SetAuthStateActionReturnType
  | SetUserIDActionReturnType
  | SetUserDataActionReturnType
  | SetChannelIDActionReturnType;

export const initialAuthState: AuthStateType = {
  userData: null,
  userID: null,
  channelID: '',
};

export const authReducer = (
  state: AuthStateType = initialAuthState,
  action: AuthActionsType,
): AuthStateType => {
  switch (action.type) {
    case AUTH_ACTION.SET_CHANNEL_ID:
      return {...state, channelID: action.payload.channelID};
    case AUTH_ACTION.SET_USER_DATA:
      return {...state, userData: action.payload.userData};
    case AUTH_ACTION.SET_USER_ID:
      return {...state, userID: action.payload.userID};
    case AUTH_ACTION.SET_AUTH_STATE:
      return {...state, ...action.payload.authState};
    default:
      return state;
  }
};
