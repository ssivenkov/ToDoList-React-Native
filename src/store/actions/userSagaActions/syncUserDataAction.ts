import { USER_SAGA_ACTION } from '@enums/userSagaEnum';

export type SyncUserDataSagaActionReturnType = {
  type: USER_SAGA_ACTION.SYNC_USER_DATA;
};

export type SyncUserDataSagaActionType = () => SyncUserDataSagaActionReturnType;

export const syncUserDataAction: SyncUserDataSagaActionType = () => ({
  type: USER_SAGA_ACTION.SYNC_USER_DATA,
});
