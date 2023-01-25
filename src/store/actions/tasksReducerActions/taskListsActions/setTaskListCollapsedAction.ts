import { TASKS_REDUCER_ACTION } from '@enums/tasksReducerEnum';
import { TaskListType } from '@store/reducers/tasksReducer/types';

type SetCollapsedTaskListActionPayloadType = {
  taskListID: TaskListType['id'];
  isTodoCollapsed: TaskListType['isTodoCollapsed'];
  isDoneCollapsed: TaskListType['isDoneCollapsed'];
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
