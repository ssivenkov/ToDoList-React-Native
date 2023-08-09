import { TASKS_REDUCER_ACTION } from '@enums/tasksReducerEnum';
import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';

type SetTaskTodoStatusActionPayloadType = {
  isDone: TaskType['isDone'];
  modificationDate: TaskType['modificationDate'];
  taskID: TaskType['id'];
  taskListID: TaskListType['id'];
};

export type SetTaskTodoStatusActionReturnType = {
  payload: SetTaskTodoStatusActionPayloadType;
  type: TASKS_REDUCER_ACTION.SET_TASK_TODO_STATUS;
};

export type SetTaskTodoStatusActionType = (
  payload: SetTaskTodoStatusActionPayloadType,
) => SetTaskTodoStatusActionReturnType;

export const setTaskTodoStatusAction: SetTaskTodoStatusActionType = (payload) => ({
  payload,
  type: TASKS_REDUCER_ACTION.SET_TASK_TODO_STATUS,
});
