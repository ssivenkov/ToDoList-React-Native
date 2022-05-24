import {USER_SAGA_ACTION} from '@enums/userSagaEnum';

export type SyncUserTaskListsSagaActionReturnType = {
  type: USER_SAGA_ACTION.SYNC_USER_TASK_LISTS;
};

export type SyncUserTaskListsSagaActionType =
  () => SyncUserTaskListsSagaActionReturnType;

export const syncUserTaskListsAction: SyncUserTaskListsSagaActionType = () => ({
  type: USER_SAGA_ACTION.SYNC_USER_TASK_LISTS,
});
