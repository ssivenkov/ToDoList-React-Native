import { TASKS_REDUCER_ACTION } from '@enums/tasksReducerEnum';
import { TaskListInterface } from '@store/reducers/tasksReducer/types';

type DeleteTaskListFullActionPayloadType = {
  taskListID: TaskListInterface['id'];
};

export type DeleteTaskListFullActionReturnType = {
  type: TASKS_REDUCER_ACTION.DELETE_TASK_LIST_FULL;
  payload: DeleteTaskListFullActionPayloadType;
};

export type DeleteTaskListFullActionType = (
  payload: DeleteTaskListFullActionPayloadType,
) => DeleteTaskListFullActionReturnType;

export const deleteTaskListFullAction: DeleteTaskListFullActionType = (payload) => ({
  type: TASKS_REDUCER_ACTION.DELETE_TASK_LIST_FULL,
  payload,
});
