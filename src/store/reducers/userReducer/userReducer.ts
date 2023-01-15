import { COLORS } from '@colors/colors';
import { EN } from '@constants/languages';
import { USER_REDUCER_ACTION } from '@enums/userReducerEnum';
import {
  UserReducerActionsType,
  UserReducerStateType,
} from '@store/reducers/userReducer/types';
import { lightTheme } from '@themes/themes';

const userReducerState: UserReducerStateType = {
  providerID: null,
  userData: null,
  channelID: '',
  userAvatar: null,
  language: EN,
  theme: lightTheme,
  accentColor: COLORS.ELECTRIC_VIOLET2,
  selectedColor: COLORS.ELECTRIC_VIOLET2,
  globalLoader: false,
  modalMessage: '',
  isUserDataSynchronized: false,
  isWaitingUserDataOnSignIn: false,
};

export const userReducer = (
  state = userReducerState,
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
        isUserDataSynchronized: action.payload.isUserDataSynchronized,
        accentColor: action.payload.accentColor,
        selectedColor: action.payload.selectedColor,
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
    case USER_REDUCER_ACTION.SET_SELECTED_COLOR:
      return { ...state, selectedColor: action.payload.selectedColor };
    case USER_REDUCER_ACTION.SET_GLOBAL_LOADER:
      return { ...state, globalLoader: action.payload.globalLoader };
    case USER_REDUCER_ACTION.SET_MODAL_MESSAGE:
      return { ...state, modalMessage: action.payload.modalMessage };
    case USER_REDUCER_ACTION.SET_IS_USER_DATA_SYNCHRONIZED:
      return { ...state, isUserDataSynchronized: action.payload.isUserDataSynchronized };
    case USER_REDUCER_ACTION.SET_IS_WAITING_USER_DATA_ON_SIGN_IN:
      return {
        ...state,
        isWaitingUserDataOnSignIn: action.payload.isWaitingUserDataOnSignIn,
      };
    default:
      return state;
  }
};
