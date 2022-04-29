import {TASKS_ACTIONS} from '@enums/tasksEnum';
import {NotificationType} from '@store/reducers/tasksReducer/types';

type EditTaskNotificationActionPayloadType = {
  notification: NotificationType;
};

export type EditTaskNotificationActionReturnType = {
  type: TASKS_ACTIONS.EDIT_TASK_NOTIFICATION;
  payload: EditTaskNotificationActionPayloadType;
};

export type EditTaskNotificationsActionType = (
  payload: EditTaskNotificationActionPayloadType,
) => EditTaskNotificationActionReturnType;

export const editTaskNotificationAction: EditTaskNotificationsActionType = (
  payload,
) => ({
  type: TASKS_ACTIONS.EDIT_TASK_NOTIFICATION,
  payload,
});
