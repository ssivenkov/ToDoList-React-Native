import {AUTH_SAGA_ACTIONS} from '@enums/authSagaEnum';

export type CreateChannelSagaActionReturnType = {
  type: AUTH_SAGA_ACTIONS.CREATE_CHANNEL_SAGA;
};

export type CreateChannelSagaActionType =
  () => CreateChannelSagaActionReturnType;

export const createChannelAction: CreateChannelSagaActionType =
  (): CreateChannelSagaActionReturnType => ({
    type: AUTH_SAGA_ACTIONS.CREATE_CHANNEL_SAGA,
  });
