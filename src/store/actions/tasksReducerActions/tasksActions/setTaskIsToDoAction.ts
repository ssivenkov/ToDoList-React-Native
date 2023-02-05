import { TASKS_REDUCER_ACTION } from '@enums/tasksReducerEnum';
import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';

type SetTaskIsToDoActionPayloadType = {
  doneTaskID: TaskType['id'];
  taskListID: TaskListType['id'];
};

export type SetTaskIsToDoActionReturnType = {
  payload: SetTaskIsToDoActionPayloadType;
  type: TASKS_REDUCER_ACTION.SET_TASK_IS_TODO;
};

export type SetTaskIsToDoActionType = (
  payload: SetTaskIsToDoActionPayloadType,
) => SetTaskIsToDoActionReturnType;

export const setTaskIsToDoAction: SetTaskIsToDoActionType = (payload) => ({
  payload,
  type: TASKS_REDUCER_ACTION.SET_TASK_IS_TODO,
});
