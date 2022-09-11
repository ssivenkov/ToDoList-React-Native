import { TASKS_REDUCER_ACTION } from '@enums/tasksReducerEnum';
import { TaskListInterface } from '@store/reducers/tasksReducer/types';

type SetCollapsedTaskListActionPayloadType = {
  taskListID: TaskListInterface['id'];
  isTodoCollapsed: TaskListInterface['isTodoCollapsed'];
  isDoneCollapsed: TaskListInterface['isDoneCollapsed'];
};

export type SetCollapsedTaskListActionReturnType = {
  type: TASKS_REDUCER_ACTION.SET_COLLAPSED_TASK_LIST;
  payload: SetCollapsedTaskListActionPayloadType;
};

export type SetCollapsedTaskListActionType = (
  payload: SetCollapsedTaskListActionPayloadType,
) => SetCollapsedTaskListActionReturnType;

export const setCollapsedTaskListAction: SetCollapsedTaskListActionType = (payload) => ({
  type: TASKS_REDUCER_ACTION.SET_COLLAPSED_TASK_LIST,
  payload,
});
