import {AUTH_SAGA_ACTIONS} from '@enums/authSagaEnum';

export type SyncUserTaskListsSagaActionReturnType = {
  type: typeof AUTH_SAGA_ACTIONS.SYNC_USER_TASK_LISTS;
};

export type SyncUserTaskListsSagaActionType =
  () => SyncUserTaskListsSagaActionReturnType;

export const syncUserTaskListsAction: SyncUserTaskListsSagaActionType = () => ({
  type: AUTH_SAGA_ACTIONS.SYNC_USER_TASK_LISTS,
});
