import {AUTH_REDUCER_ACTION} from '@enums/authReducerEnum';
import {SetAuthStateActionReturnType} from '@store/actions/authReducerActions/setAuthStateAction';
import {SetChannelIDActionReturnType} from '@store/actions/authReducerActions/setChannelIDAction';
import {SetUserDataActionReturnType} from '@store/actions/authReducerActions/setUserDataAction';
import {AuthStateType} from '@store/reducers/authReducer/types';

export type AuthActionsType =
  | SetAuthStateActionReturnType
  | SetUserDataActionReturnType
  | SetChannelIDActionReturnType;

export const initialAuthState: AuthStateType = {
  userData: null,
  channelID: '',
};

export const authReducer = (
  state: AuthStateType = initialAuthState,
  action: AuthActionsType,
): AuthStateType => {
  switch (action.type) {
    case AUTH_REDUCER_ACTION.SET_CHANNEL_ID:
      return {...state, channelID: action.payload.channelID};
    case AUTH_REDUCER_ACTION.SET_USER_DATA:
      return {...state, userData: action.payload.userData};
    case AUTH_REDUCER_ACTION.SET_AUTH_STATE:
      return {...state, ...action.payload.authState};
    default:
      return state;
  }
};
