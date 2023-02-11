import { USER_SAGA_ACTION } from '@enums/userSagaEnum';

export type ShareAppSagaActionReturnType = {
  type: USER_SAGA_ACTION.SHARE_APP;
};

export type ShareAppSagaActionType = () => ShareAppSagaActionReturnType;

export const shareAppAction: ShareAppSagaActionType = () => ({
  type: USER_SAGA_ACTION.SHARE_APP,
});
