import {AUTH_REDUCER_ACTION} from '@enums/authReducerEnum';
import {ChannelIDType} from '@store/reducers/authReducer/types';

type SetChannelIDActionPayloadType = {
  channelID: ChannelIDType;
};

export type SetChannelIDActionReturnType = {
  type: AUTH_REDUCER_ACTION.SET_CHANNEL_ID;
  payload: SetChannelIDActionPayloadType;
};

export type SetChannelIDActionType = (
  payload: SetChannelIDActionPayloadType,
) => SetChannelIDActionReturnType;

export const setChannelIDAction: SetChannelIDActionType = (payload) => ({
  type: AUTH_REDUCER_ACTION.SET_CHANNEL_ID,
  payload,
});
