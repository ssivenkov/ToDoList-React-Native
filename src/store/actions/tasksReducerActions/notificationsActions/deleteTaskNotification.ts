import {TASKS_ACTIONS} from '@enums/tasksEnum';

type DeleteTaskActionPayloadType = {
  taskID: string;
};

export type DeleteTaskNotificationActionReturnType = {
  type: TASKS_ACTIONS.DELETE_TASK_NOTIFICATION;
  payload: DeleteTaskActionPayloadType;
};

export type DeleteTaskNotificationActionType = (
  payload: DeleteTaskActionPayloadType,
) => DeleteTaskNotificationActionReturnType;

export const deleteTaskNotification: DeleteTaskNotificationActionType = (
  payload,
) => ({
  type: TASKS_ACTIONS.DELETE_TASK_NOTIFICATION,
  payload,
});
