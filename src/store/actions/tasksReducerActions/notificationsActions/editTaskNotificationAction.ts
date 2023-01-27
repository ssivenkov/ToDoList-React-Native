import { TASKS_REDUCER_ACTION } from '@enums/tasksReducerEnum';
import { NotificationType } from '@store/reducers/tasksReducer/types';

type EditTaskNotificationActionPayloadType = {
  notification: NotificationType;
};

export type EditTaskNotificationActionReturnType = {
  payload: EditTaskNotificationActionPayloadType;
  type: TASKS_REDUCER_ACTION.EDIT_TASK_NOTIFICATION;
};

export type EditTaskNotificationsActionType = (
  payload: EditTaskNotificationActionPayloadType,
) => EditTaskNotificationActionReturnType;

export const editTaskNotificationAction: EditTaskNotificationsActionType = (payload) => ({
  payload,
  type: TASKS_REDUCER_ACTION.EDIT_TASK_NOTIFICATION,
});
