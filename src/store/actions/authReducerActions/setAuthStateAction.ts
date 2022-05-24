import {AUTH_REDUCER_ACTION} from '@enums/authReducerEnum';
import {ChannelIDType, UserDataType} from '@store/reducers/authReducer/types';

type SetAuthStateActionPayloadType = {
  userData: UserDataType;
  channelID: ChannelIDType;
};

export type SetAuthStateActionReturnType = {
  type: AUTH_REDUCER_ACTION.SET_AUTH_STATE;
  payload: SetAuthStateActionPayloadType;
};

export type SetAuthStateActionType = (
  payload: SetAuthStateActionPayloadType,
) => SetAuthStateActionReturnType;

export const setAuthStateAction: SetAuthStateActionType = (payload) => ({
  type: AUTH_REDUCER_ACTION.SET_AUTH_STATE,
  payload,
});
