import { USER_SAGA_ACTION } from '@enums/userSagaEnum';

export type CreateChannelSagaActionReturnType = {
  type: USER_SAGA_ACTION.CREATE_CHANNEL;
};

export type CreateChannelSagaActionType = () => CreateChannelSagaActionReturnType;

export const createChannelAction: CreateChannelSagaActionType =
  (): CreateChannelSagaActionReturnType => ({
    type: USER_SAGA_ACTION.CREATE_CHANNEL,
  });
