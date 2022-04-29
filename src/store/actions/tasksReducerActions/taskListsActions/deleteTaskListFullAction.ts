import {TASKS_ACTIONS} from '@enums/tasksEnum';

type DeleteTaskListFullActionPayloadType = {
  taskListId: string;
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
