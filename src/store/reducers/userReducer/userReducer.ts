import { COLORS } from '@colors/colors';
import { EN } from '@constants/constants';
import { USER_REDUCER_ACTION } from '@enums/userReducerEnum';
import { lightTheme } from '@root/themes/theme';
import {
  UserReducerActionsType,
  UserReducerStateType,
} from '@store/reducers/userReducer/types';

const initialAuthReducerState: UserReducerStateType = {
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
  state: UserReducerStateType = initialAuthReducerState,
  action: UserReducerActionsType,
): UserReducerStateType => {
  switch (action.type) {
    case USER_REDUCER_ACTION.SET_CHANNEL_ID:
      return { ...state, channelID: action.payload.channelID };
    case USER_REDUCER_ACTION.SET_USER_DATA:
      return { ...state, userData: action.payload.userData };
    case USER_REDUCER_ACTION.SET_AUTH_STATE:
      return {
        ...state,
        userData: action.payload.userData,
        providerID: action.payload.providerID,
      };
    case USER_REDUCER_ACTION.SET_PROVIDER_ID:
      return { ...state, providerID: action.payload.providerID };
    case USER_REDUCER_ACTION.SET_USER_AVATAR:
      return { ...state, userAvatar: action.payload.userAvatar };
    case USER_REDUCER_ACTION.SET_LANGUAGE:
      return { ...state, language: action.payload.language };
    case USER_REDUCER_ACTION.SET_THEME:
      return { ...state, theme: action.payload.theme };
    case USER_REDUCER_ACTION.SET_ACCENT_COLOR:
      return { ...state, accentColor: action.payload.accentColor };
    case USER_REDUCER_ACTION.SET_ERROR_MODAL_MESSAGE:
      return { ...state, errorModalMessage: action.payload.errorModalMessage };
    default:
      return state;
  }
};
