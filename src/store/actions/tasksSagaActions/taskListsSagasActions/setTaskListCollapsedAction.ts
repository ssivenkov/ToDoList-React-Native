import { TASKS_SAGA_ACTION } from '@enums/tasksSagaEnum';
import { TaskListInterface } from '@store/reducers/tasksReducer/types';

export type SetTaskListCollapsedSagaPayloadType = {
  taskListID: TaskListInterface['id'];
  isTodoCollapsed: TaskListInterface['isTodoCollapsed'];
  isDoneCollapsed: TaskListInterface['isDoneCollapsed'];
};

export type SetTaskListCollapsedSagaActionReturnType = {
  type: TASKS_SAGA_ACTION.SET_TASK_LIST_COLLAPSED;
  payload: SetTaskListCollapsedSagaPayloadType;
};

export type SetTaskListCollapsedSagaActionType = (
  payload: SetTaskListCollapsedSagaPayloadType,
) => SetTaskListCollapsedSagaActionReturnType;

export const setTaskListCollapsedAction: SetTaskListCollapsedSagaActionType = (
  payload,
) => ({
  type: TASKS_SAGA_ACTION.SET_TASK_LIST_COLLAPSED,
  payload,
});
