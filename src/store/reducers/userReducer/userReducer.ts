import {COLORS} from '@colors/colors';
import {EN} from '@constants/constants';
import {USER_REDUCER_ACTION} from '@enums/userReducerEnum';
import {lightTheme} from '@root/themes/theme';
import {SetAccentColorActionReturnType} from '@store/actions/userReducerActions/setAccentColorAction';
import {SetAuthStateActionReturnType} from '@store/actions/userReducerActions/setAuthStateAction';
import {SetChannelIDActionReturnType} from '@store/actions/userReducerActions/setChannelIDAction';
import {SetLanguageActionReturnType} from '@store/actions/userReducerActions/setLanguageAction';
import {SetErrorModalMessageActionReturnType} from '@store/actions/userReducerActions/setModalErrorMessageAction';
import {SetProviderIDActionReturnType} from '@store/actions/userReducerActions/setProviderIDAction';
import {SetThemeActionReturnType} from '@store/actions/userReducerActions/setThemeAction';
import {SetUserAvatarActionReturnType} from '@store/actions/userReducerActions/setUserAvatarAction';
import {SetUserDataActionReturnType} from '@store/actions/userReducerActions/setUserDataAction';
import {UserReducerStateType} from '@store/reducers/userReducer/types';

export type UserActionsType =
  | SetAuthStateActionReturnType
  | SetUserDataActionReturnType
  | SetChannelIDActionReturnType
  | SetLanguageActionReturnType
  | SetProviderIDActionReturnType
  | SetUserAvatarActionReturnType
  | SetThemeActionReturnType
  | SetAccentColorActionReturnType
  | SetErrorModalMessageActionReturnType;

export const initialAuthState: UserReducerStateType = {
  providerID: null,
  userData: null,
  channelID: '',
  userAvatar: null,
  language: EN,
  theme: lightTheme,
  accentColor: COLORS.FLIRT,
  errorModalMessage: '',
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
        providerID: action.payload.providerID,
      };
    case USER_REDUCER_ACTION.SET_PROVIDER_ID:
      return {...state, providerID: action.payload.providerID};
    case USER_REDUCER_ACTION.SET_USER_AVATAR:
      return {...state, userAvatar: action.payload.userAvatar};
    case USER_REDUCER_ACTION.SET_LANGUAGE:
      return {...state, language: action.payload.language};
    case USER_REDUCER_ACTION.SET_THEME:
      return {...state, theme: action.payload.theme};
    case USER_REDUCER_ACTION.SET_ACCENT_COLOR:
      return {...state, accentColor: action.payload.accentColor};
    case USER_REDUCER_ACTION.SET_ERROR_MODAL_MESSAGE:
      return {...state, errorModalMessage: action.payload.errorModalMessage};
    default:
      return state;
  }
};
