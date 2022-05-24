import {EN} from '@constants/constants';
import {USER_REDUCER_ACTION} from '@enums/userReducerEnum';
import {SetAuthStateActionReturnType} from '@store/actions/userReducerActions/setAuthStateAction';
import {SetChannelIDActionReturnType} from '@store/actions/userReducerActions/setChannelIDAction';
import {SetLanguageActionReturnType} from '@store/actions/userReducerActions/setLanguageAction';
import {SetUserDataActionReturnType} from '@store/actions/userReducerActions/setUserDataAction';
import {UserReducerStateType} from '@store/reducers/userReducer/types';

export type UserActionsType =
  | SetAuthStateActionReturnType
  | SetUserDataActionReturnType
  | SetChannelIDActionReturnType
  | SetLanguageActionReturnType;

export const initialAuthState: UserReducerStateType = {
  userData: null,
  channelID: '',
  language: EN,
};

export const userReducer = (
  state: UserReducerStateType = initialAuthState,
  action: UserActionsType,
): UserReducerStateType => {
  switch (action.type) {
    case USER_REDUCER_ACTION.SET_CHANNEL_ID:
      return {...state, channelID: action.payload.channelID};
    case USER_REDUCER_ACTION.SET_USER_DATA:
      return {...state, userData: action.payload.userData};
    case USER_REDUCER_ACTION.SET_AUTH_STATE:
      return {
        ...state,
        userData: action.payload.userData,
        channelID: action.payload.channelID,
      };
    case USER_REDUCER_ACTION.SET_LANGUAGE:
      return {...state, language: action.payload.language};
    default:
      return state;
  }
};
