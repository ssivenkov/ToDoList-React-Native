import {AUTH_SAGA_ACTION} from '@enums/authSagaEnum';

export type CreateChannelSagaActionReturnType = {
  type: AUTH_SAGA_ACTION.CREATE_CHANNEL;
};

export type CreateChannelSagaActionType =
  () => CreateChannelSagaActionReturnType;

export const createChannelAction: CreateChannelSagaActionType =
  (): CreateChannelSagaActionReturnType => ({
    type: AUTH_SAGA_ACTION.CREATE_CHANNEL,
  });
