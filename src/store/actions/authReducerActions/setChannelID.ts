import {AUTH_ACTIONS} from '@enums/authEnum';

type SetChannelIDActionPayloadType = {
  channelID: string;
};

export type SetChannelIDActionReturnType = {
  type: AUTH_ACTIONS.SET_CHANNEL_ID;
  payload: SetChannelIDActionPayloadType;
};

export type SetChannelIDActionType = (
  payload: SetChannelIDActionPayloadType,
) => SetChannelIDActionReturnType;

export const setChannelID: SetChannelIDActionType = (payload) => ({
  type: AUTH_ACTIONS.SET_CHANNEL_ID,
  payload,
});
