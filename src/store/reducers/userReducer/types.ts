import {
  BY,
  CN,
  DE,
  EN,
  ES,
  FACEBOOK_PROVIDER_ID,
  FR,
  GOOGLE_PROVIDER_ID,
  ID,
  IT,
  JP,
  KR,
  PL,
  PT,
  RU,
  TR,
  UA,
} from '@constants/constants';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { FirebaseDatabaseTypes } from '@react-native-firebase/database';
import { Nullable } from '@root/types/common/types';
import { SetAccentColorActionReturnType } from '@store/actions/userReducerActions/setAccentColorAction';
import { SetAuthStateActionReturnType } from '@store/actions/userReducerActions/setAuthStateAction';
import { SetChannelIDActionReturnType } from '@store/actions/userReducerActions/setChannelIDAction';
import { SetGlobalLoaderActionReturnType } from '@store/actions/userReducerActions/setGlobalLoaderAction';
import { SetIsUserDataSynchronizedActionReturnType } from '@store/actions/userReducerActions/setIsUserDataSynchronized';
import { SetLanguageActionReturnType } from '@store/actions/userReducerActions/setLanguageAction';
import { SetErrorModalMessageActionReturnType } from '@store/actions/userReducerActions/setModalErrorMessageAction';
import { SetProviderIDActionReturnType } from '@store/actions/userReducerActions/setProviderIDAction';
import { SetSelectedColorActionReturnType } from '@store/actions/userReducerActions/setSelectedColorAction';
import { SetThemeActionReturnType } from '@store/actions/userReducerActions/setThemeAction';
import { SetUserAvatarActionReturnType } from '@store/actions/userReducerActions/setUserAvatarAction';
import { SetUserDataActionReturnType } from '@store/actions/userReducerActions/setUserDataAction';

export type SnapshotType = FirebaseDatabaseTypes.DataSnapshot;
export type UserDataType = Nullable<FirebaseAuthTypes.User>;
export type UserIDType = Nullable<FirebaseAuthTypes.User['uid']>;
export type ChannelIDType = string;
export type LanguageType =
  | typeof EN
  | typeof RU
  | typeof BY
  | typeof FR
  | typeof ES
  | typeof IT
  | typeof DE
  | typeof TR
  | typeof ID
  | typeof PL
  | typeof PT
  | typeof JP
  | typeof CN
  | typeof KR
  | typeof UA;
export type ProviderIDType = Nullable<
  typeof GOOGLE_PROVIDER_ID | typeof FACEBOOK_PROVIDER_ID
>;
export type UserAvatarType = Nullable<string>;
export type ThemeType = {
  darkMode: boolean;
  BACKGROUND_COLOR: string;
  MODAL_BACKGROUND_COLOR: string;
  TASK_LIST_COLOR: string;
  TASK_COLOR: string;
  TEXT_COLOR: string;
  TAB_BAR_BACKGROUND_COLOR: string;
  TAB_BAR_ICON_COLOR: string;
  TAB_BAR_TEXT_COLOR: string;
  ICON_BUTTON_COLOR: string;
  PLACEHOLDER_COLOR: string;
  NOTEPAD_PLACEHOLDER_COLOR: string;
  SUBTEXT_COLOR: string;
};
export type ColorType = string;
export type ErrorModalMessageType = string;

export type UserReducerStateType = {
  providerID: ProviderIDType;
  userData: UserDataType;
  channelID: ChannelIDType;
  userAvatar: UserAvatarType;
  language: LanguageType;
  theme: ThemeType;
  accentColor: ColorType;
  selectedColor: ColorType;
  globalLoader: boolean;
  errorModalMessage: ErrorModalMessageType;
  isUserDataSynchronized: boolean;
};

export type UserReducerActionsType =
  | SetAuthStateActionReturnType
  | SetUserDataActionReturnType
  | SetChannelIDActionReturnType
  | SetLanguageActionReturnType
  | SetProviderIDActionReturnType
  | SetUserAvatarActionReturnType
  | SetThemeActionReturnType
  | SetAccentColorActionReturnType
  | SetSelectedColorActionReturnType
  | SetGlobalLoaderActionReturnType
  | SetErrorModalMessageActionReturnType
  | SetIsUserDataSynchronizedActionReturnType;
