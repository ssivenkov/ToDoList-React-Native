import { TASKS_REDUCER_ACTION } from '@enums/tasksReducerEnum';
import { TaskListType } from '@store/reducers/tasksReducer/types';

type SetCollapsedTaskListActionPayloadType = {
  isDoneCollapsed: TaskListType['isDoneCollapsed'];
  isTodoCollapsed: TaskListType['isTodoCollapsed'];
  taskListID: TaskListType['id'];
};

export type SetCollapsedTaskListActionReturnType = {
  payload: SetCollapsedTaskListActionPayloadType;
  type: TASKS_REDUCER_ACTION.SET_COLLAPSED_TASK_LIST;
};

export type SetCollapsedTaskListActionType = (
  payload: SetCollapsedTaskListActionPayloadType,
) => SetCollapsedTaskListActionReturnType;

export const setCollapsedTaskListAction: SetCollapsedTaskListActionType = (payload) => ({
  payload,
  type: TASKS_REDUCER_ACTION.SET_COLLAPSED_TASK_LIST,
});
