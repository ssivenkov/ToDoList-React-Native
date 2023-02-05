import { TASKS_SAGA_ACTION } from '@enums/tasksSagaEnum';
import { SetStateType } from '@root/types/common/types';
import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';

export type SetTaskIsDoneSagaPayloadType = {
  taskListID: TaskListType['id'];
  toDoTaskID: TaskType['id'];

  setSnackBarCancelFulfilled?: SetStateType<boolean>;
  setSnackBarCancelPending?: SetStateType<boolean>;
  setTaskPending?: SetStateType<boolean>;
  setTaskScreenBlocking?: SetStateType<boolean>;
  shouldCreateSnackBarEvent?: boolean;
};

export type SetTaskIsDoneSagaActionReturnType = {
  payload: SetTaskIsDoneSagaPayloadType;
  type: TASKS_SAGA_ACTION.SET_TASK_IS_DONE;
};

export type SetTaskIsDoneSagaActionType = (
  payload: SetTaskIsDoneSagaPayloadType,
) => SetTaskIsDoneSagaActionReturnType;

export const setTaskIsDoneAction: SetTaskIsDoneSagaActionType = (payload) => ({
  payload,
  type: TASKS_SAGA_ACTION.SET_TASK_IS_DONE,
});
