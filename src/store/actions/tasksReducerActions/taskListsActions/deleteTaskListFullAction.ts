import {TASKS_ACTION} from '@enums/tasksEnum';
import {TaskListInterface} from '@store/reducers/tasksReducer/types';

type DeleteTaskListFullActionPayloadType = {
  taskListId: TaskListInterface['id'];
};

export type DeleteTaskListFullActionReturnType = {
  type: TASKS_ACTION.DELETE_TASK_LIST_FULL;
  payload: DeleteTaskListFullActionPayloadType;
};

export type DeleteTaskListFullActionType = (
  payload: DeleteTaskListFullActionPayloadType,
) => DeleteTaskListFullActionReturnType;

export const deleteTaskListFullAction: DeleteTaskListFullActionType = (
  payload,
) => ({
  type: TASKS_ACTION.DELETE_TASK_LIST_FULL,
  payload,
});
