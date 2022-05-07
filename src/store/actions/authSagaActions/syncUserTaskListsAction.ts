import {AUTH_SAGA_ACTION} from '@enums/authSagaEnum';

export type SyncUserTaskListsSagaActionReturnType = {
  type: AUTH_SAGA_ACTION.SYNC_USER_TASK_LISTS;
};

export type SyncUserTaskListsSagaActionType =
  () => SyncUserTaskListsSagaActionReturnType;

export const syncUserTaskListsAction: SyncUserTaskListsSagaActionType = () => ({
  type: AUTH_SAGA_ACTION.SYNC_USER_TASK_LISTS,
});
