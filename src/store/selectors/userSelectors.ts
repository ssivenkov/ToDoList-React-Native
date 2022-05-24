import {
  ChannelIDType,
  LanguageType,
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
