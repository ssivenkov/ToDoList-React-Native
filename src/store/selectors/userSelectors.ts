import {
  ModalMessageType,
  UserIDType,
  UserReducerStateType,
} from '@store/reducers/userReducer/types';
import { AppRootStateType } from '@store/types';

export const userIDSelector = (state: AppRootStateType): UserIDType => {
  return state.user.userData?.uid ?? null;
};

export const userDataSelector = (
  state: AppRootStateType,
): UserReducerStateType['userData'] => {
  return state.user.userData;
};

export const channelIDSelector = (
  state: AppRootStateType,
): UserReducerStateType['channelID'] => {
  return state.user.channelID;
};

export const languageSelector = (
  state: AppRootStateType,
): UserReducerStateType['language'] => {
  return state.user.language;
};

export const providerIDSelector = (
  state: AppRootStateType,
): UserReducerStateType['providerID'] => {
  return state.user.providerID;
};

export const userAvatarSelector = (
  state: AppRootStateType,
): UserReducerStateType['userAvatar'] => {
  return state.user.userAvatar;
};

export const themeSelector = (state: AppRootStateType): UserReducerStateType['theme'] => {
  return state.user.theme;
};

export const accentColorSelector = (
  state: AppRootStateType,
): UserReducerStateType['accentColor'] => {
  return state.user.accentColor;
};

export const selectedColorSelector = (
  state: AppRootStateType,
): UserReducerStateType['selectedColor'] => {
  return state.user.selectedColor;
};

export const globalLoaderSelector = (
  state: AppRootStateType,
): UserReducerStateType['globalLoader'] => {
  return state.user.globalLoader;
};

export const modalMessageSelector = (state: AppRootStateType): ModalMessageType => {
  return state.user.modalMessage;
};

export const isUserDataSynchronizedSelector = (
  state: AppRootStateType,
): UserReducerStateType['isUserDataSynchronized'] => {
  return state.user.isUserDataSynchronized;
};

export const isWaitingUserDataOnSignInSelector = (
  state: AppRootStateType,
): UserReducerStateType['isWaitingUserDataOnSignIn'] => {
  return state.user.isWaitingUserDataOnSignIn;
};

export const emulatorStatusBarHeightSelector = (
  state: AppRootStateType,
): UserReducerStateType['emulatorStatusBarHeight'] => {
  return state.user.emulatorStatusBarHeight;
};

export const lastRouteSelector = (
  state: AppRootStateType,
): UserReducerStateType['lastRoute'] => {
  return state.user.lastRoute;
};

export const taskListTitleSizeSelector = (
  state: AppRootStateType,
): UserReducerStateType['taskListTitleSize'] => {
  return state.user.taskListTitleSize;
};

export const taskTextSizeSelector = (
  state: AppRootStateType,
): UserReducerStateType['taskTextSize'] => {
  return state.user.taskTextSize;
};

export const notepadTextSizeSelector = (
  state: AppRootStateType,
): UserReducerStateType['notepadTextSize'] => {
  return state.user.notepadTextSize;
};

export const modalWindowTextSizeSelector = (
  state: AppRootStateType,
): UserReducerStateType['modalWindowTextSize'] => {
  return state.user.modalWindowTextSize;
};

export const modalButtonTextSizeSelector = (
  state: AppRootStateType,
): UserReducerStateType['modalButtonTextSize'] => {
  return state.user.modalButtonTextSize;
};
