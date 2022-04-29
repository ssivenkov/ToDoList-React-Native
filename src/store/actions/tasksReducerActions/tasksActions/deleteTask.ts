import {TASKS_ACTIONS} from '@enums/tasksEnum';

type DeleteTaskActionPayloadType = {
  taskListId: string;
  taskId: string;
};

export type DeleteTaskActionReturnType = {
  type: TASKS_ACTIONS.DELETE_TASK;
  payload: DeleteTaskActionPayloadType;
};

export type DeleteTaskActionType = (
  payload: DeleteTaskActionPayloadType,
) => DeleteTaskActionReturnType;

export const deleteTask: DeleteTaskActionType = (payload) => ({
  type: TASKS_ACTIONS.DELETE_TASK,
  payload,
});
