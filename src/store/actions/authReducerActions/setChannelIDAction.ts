import {AUTH_ACTIONS} from '@enums/authEnum';
import {ChannelIDType} from '@store/reducers/authReducer/types';

type SetChannelIDActionPayloadType = {
  channelID: ChannelIDType;
};

export type SetChannelIDActionReturnType = {
  type: AUTH_ACTIONS.SET_CHANNEL_ID;
  payload: SetChannelIDActionPayloadType;
};

export type SetChannelIDActionType = (
  payload: SetChannelIDActionPayloadType,
) => SetChannelIDActionReturnType;

export const setChannelIDAction: SetChannelIDActionType = (payload) => ({
  type: AUTH_ACTIONS.SET_CHANNEL_ID,
  payload,
});
