import { COLORS } from '@colors/colors';
import { EN } from '@constants/languages';
import { WITH_AUTH_NAVIGATOR_ROUTE } from '@enums/routesEnum';
import { USER_REDUCER_ACTION } from '@enums/userReducerEnum';
import {
  UserReducerActionsType,
  UserReducerStateType,
} from '@store/reducers/userReducer/types';
import { lightTheme } from '@themes/themes';

export const userReducerState: UserReducerStateType = {
  accentColor: COLORS.ELECTRIC_VIOLET2,
  channelID: '',
  emulatorStatusBarHeight: 0,
  globalLoader: false,
  isUserDataSynchronized: false,
  isWaitingUserDataOnSignIn: false,
  language: EN,
  lastRoute: WITH_AUTH_NAVIGATOR_ROUTE.TASKS_NAVIGATOR,
  modalMessage: '',
  providerID: null,
  selectedColor: COLORS.ELECTRIC_VIOLET2,
  theme: lightTheme,
  userAvatar: null,
  userData: null,
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
        accentColor: action.payload.accentColor,
        emulatorStatusBarHeight: action.payload.emulatorStatusBarHeight,
        isUserDataSynchronized: action.payload.isUserDataSynchronized,
        isWaitingUserDataOnSignIn: action.payload.isWaitingUserDataOnSignIn,
        language: action.payload.language,
        lastRoute: action.payload.lastRoute,
        providerID: action.payload.providerID,
        selectedColor: action.payload.selectedColor,
        theme: action.payload.theme,
        userAvatar: action.payload.userAvatar,
        userData: action.payload.userData,
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
    case USER_REDUCER_ACTION.SET_LAST_ROUTE:
      return { ...state, lastRoute: action.payload.lastRoute };
    case USER_REDUCER_ACTION.SET_IS_WAITING_USER_DATA_ON_SIGN_IN:
      return {
        ...state,
        isWaitingUserDataOnSignIn: action.payload.isWaitingUserDataOnSignIn,
      };
    case USER_REDUCER_ACTION.SET_EMULATOR_STATUS_BAR_HEIGHT:
      return {
        ...state,
        emulatorStatusBarHeight: action.payload.emulatorStatusBarHeight,
      };
    default:
      return state;
  }
};
