import { USER_REDUCER_ACTION } from '@enums/userReducerEnum';
import { ChannelIDType } from '@store/reducers/userReducer/types';

type SetChannelIDActionPayloadType = {
  channelID: ChannelIDType;
};

export type SetChannelIDActionReturnType = {
  type: USER_REDUCER_ACTION.SET_CHANNEL_ID;
  payload: SetChannelIDActionPayloadType;
};

export type SetChannelIDActionType = (
  payload: SetChannelIDActionPayloadType,
) => SetChannelIDActionReturnType;

export const setChannelIDAction: SetChannelIDActionType = (payload) => ({
  type: USER_REDUCER_ACTION.SET_CHANNEL_ID,
  payload,
});
