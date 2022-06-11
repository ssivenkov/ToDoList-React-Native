import {
  ColorType,
  ChannelIDType,
  ErrorModalMessageType,
  LanguageType,
  ProviderIDType,
  ThemeType,
  UserAvatarType,
  UserDataType,
  UserIDType,
} from '@store/reducers/userReducer/types';
import {AppRootStateType} from '@store/store';

export const userIDSelector = (state: AppRootStateType): UserIDType => {
  return state.user.userData?.uid ?? null;
};

export const userDataSelector = (state: AppRootStateType): UserDataType => {
  return state.user.userData;
};

export const channelIDSelector = (state: AppRootStateType): ChannelIDType => {
  return state.user.channelID;
};

export const languageSelector = (state: AppRootStateType): LanguageType => {
  return state.user.language;
};

export const providerIDSelector = (state: AppRootStateType): ProviderIDType => {
  return state.user.providerID;
};

export const userAvatarSelector = (state: AppRootStateType): UserAvatarType => {
  return state.user.userAvatar;
};

export const themeSelector = (state: AppRootStateType): ThemeType => {
  return state.user.theme;
};

export const accentColorSelector = (state: AppRootStateType): ColorType => {
  return state.user.accentColor;
};

export const errorModalMessageSelector = (
  state: AppRootStateType,
): ErrorModalMessageType => {
  return state.user.errorModalMessage;
};
