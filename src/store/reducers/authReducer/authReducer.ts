import {EN} from '@constants/constants';
import {AUTH_REDUCER_ACTION} from '@enums/authReducerEnum';
import {SetAuthStateActionReturnType} from '@store/actions/authReducerActions/setAuthStateAction';
import {SetChannelIDActionReturnType} from '@store/actions/authReducerActions/setChannelIDAction';
import {SetLanguageActionReturnType} from '@store/actions/authReducerActions/setLanguageAction';
import {SetUserDataActionReturnType} from '@store/actions/authReducerActions/setUserDataAction';
import {AuthStateType} from '@store/reducers/authReducer/types';

export type AuthActionsType =
  | SetAuthStateActionReturnType
  | SetUserDataActionReturnType
  | SetChannelIDActionReturnType
  | SetLanguageActionReturnType;

export const initialAuthState: AuthStateType = {
  userData: null,
  channelID: '',
  language: EN,
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
      return {
        ...state,
        userData: action.payload.userData,
        channelID: action.payload.channelID,
      };
    case AUTH_REDUCER_ACTION.SET_LANGUAGE:
      return {...state, language: action.payload.language};
    default:
      return state;
  }
};
