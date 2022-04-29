import {
  ChannelIDType,
  UserDataType,
  UserIDType,
} from '@store/reducers/authReducer/types';
import {AppRootStateType} from '@store/store';

export const getUserID = (state: AppRootStateType): UserIDType => {
  return state.auth.userID;
};

export const getUserData = (state: AppRootStateType): UserDataType => {
  return state.auth.userData;
};

export const getChannelID = (state: AppRootStateType): ChannelIDType => {
  return state.auth.channelID;
};
