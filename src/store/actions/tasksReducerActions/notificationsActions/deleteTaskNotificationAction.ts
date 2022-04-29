import {TASKS_ACTIONS} from '@enums/tasksEnum';
import {NotificationType} from '@store/reducers/tasksReducer/types';

type DeleteTaskActionPayloadType = {
  taskID: NotificationType['taskID'];
};

export type DeleteTaskNotificationActionReturnType = {
  type: TASKS_ACTIONS.DELETE_TASK_NOTIFICATION;
  payload: DeleteTaskActionPayloadType;
};

export type DeleteTaskNotificationActionType = (
  payload: DeleteTaskActionPayloadType,
) => DeleteTaskNotificationActionReturnType;

export const deleteTaskNotificationAction: DeleteTaskNotificationActionType = (
  payload,
) => ({
  type: TASKS_ACTIONS.DELETE_TASK_NOTIFICATION,
  payload,
});
