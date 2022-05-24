import {
  ChannelIDType,
  LanguageType,
  UserDataType,
  UserIDType,
} from '@store/reducers/authReducer/types';
import {AppRootStateType} from '@store/store';

export const userIDSelector = (state: AppRootStateType): UserIDType => {
  return state.auth.userData?.uid ?? null;
};

export const userDataSelector = (state: AppRootStateType): UserDataType => {
  return state.auth.userData;
};

export const channelIDSelector = (state: AppRootStateType): ChannelIDType => {
  return state.auth.channelID;
};

export const languageSelector = (state: AppRootStateType): LanguageType => {
  return state.auth.language;
};
