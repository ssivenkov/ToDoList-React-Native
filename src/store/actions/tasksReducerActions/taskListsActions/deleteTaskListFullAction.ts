import {TASKS_ACTIONS} from '@enums/tasksEnum';
import {TaskListInterface} from '@store/reducers/tasksReducer/types';

type DeleteTaskListFullActionPayloadType = {
  taskListId: TaskListInterface['id'];
};

export type DeleteTaskListFullActionReturnType = {
  type: TASKS_ACTIONS.DELETE_TASK_LIST_FULL;
  payload: DeleteTaskListFullActionPayloadType;
};

export type DeleteTaskListFullActionType = (
  payload: DeleteTaskListFullActionPayloadType,
) => DeleteTaskListFullActionReturnType;

export const deleteTaskListFullAction: DeleteTaskListFullActionType = (
  payload,
) => ({
  type: TASKS_ACTIONS.DELETE_TASK_LIST_FULL,
  payload,
});
