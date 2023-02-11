import { USER_REDUCER_ACTION } from '@enums/userReducerEnum';
import { ChannelIDType } from '@store/reducers/userReducer/types';

type SetChannelIDActionPayloadType = {
  channelID: ChannelIDType;
};

export type SetChannelIDActionReturnType = {
  payload: SetChannelIDActionPayloadType;
  type: USER_REDUCER_ACTION.SET_CHANNEL_ID;
};

export type SetChannelIDActionType = (
  payload: SetChannelIDActionPayloadType,
) => SetChannelIDActionReturnType;

export const setChannelIDAction: SetChannelIDActionType = (payload) => ({
  payload,
  type: USER_REDUCER_ACTION.SET_CHANNEL_ID,
});
