import { TASKS_SAGA_ACTION } from '@enums/tasksSagaEnum';
import { SetStateType } from '@root/types/common/types';
import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';

export type SetTaskIsToDoSagaPayloadType = {
  doneTaskID: TaskType['id'];
  taskListID: TaskListType['id'];
  taskTitle: TaskType['title'];

  setSnackBarCancelFulfilled?: SetStateType<boolean>;
  setSnackBarCancelPending?: SetStateType<boolean>;
  setTaskPending?: SetStateType<boolean>;
  setTaskScreenBlocking?: SetStateType<boolean>;
  shouldCreateSnackBarEvent?: boolean;
};

export type SetTaskIsToDoSagaActionReturnType = {
  payload: SetTaskIsToDoSagaPayloadType;
  type: TASKS_SAGA_ACTION.SET_TASK_IS_TODO;
};

export type SetTaskIsToDoSagaActionType = (
  payload: SetTaskIsToDoSagaPayloadType,
) => SetTaskIsToDoSagaActionReturnType;

export const setTaskIsToDoAction: SetTaskIsToDoSagaActionType = (payload) => ({
  payload,
  type: TASKS_SAGA_ACTION.SET_TASK_IS_TODO,
});
