import { TASKS_REDUCER_ACTION } from '@enums/tasksReducerEnum';
import { TaskListType } from '@store/reducers/tasksReducer/types';

type DeleteTaskListFullActionPayloadType = {
  taskListID: TaskListType['id'];
};

export type DeleteTaskListFullActionReturnType = {
  payload: DeleteTaskListFullActionPayloadType;
  type: TASKS_REDUCER_ACTION.DELETE_TASK_LIST_FULL;
};

export type DeleteTaskListFullActionType = (
  payload: DeleteTaskListFullActionPayloadType,
) => DeleteTaskListFullActionReturnType;

export const deleteTaskListFullAction: DeleteTaskListFullActionType = (payload) => ({
  payload,
  type: TASKS_REDUCER_ACTION.DELETE_TASK_LIST_FULL,
});
