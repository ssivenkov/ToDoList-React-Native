import {TASKS_ACTIONS} from '@enums/tasksEnum';
import {NotificationType} from '@store/reducers/tasksReducer/types';

type AddTaskNotificationActionPayloadType = {
  notification: NotificationType;
};

export type AddTaskNotificationActionReturnType = {
  type: TASKS_ACTIONS.ADD_TASK_NOTIFICATION;
  payload: AddTaskNotificationActionPayloadType;
};

export type AddTaskNotificationActionType = (
  payload: AddTaskNotificationActionPayloadType,
) => AddTaskNotificationActionReturnType;

export const addTaskNotification: AddTaskNotificationActionType = (
  payload,
): AddTaskNotificationActionReturnType => ({
  type: TASKS_ACTIONS.ADD_TASK_NOTIFICATION,
  payload,
});
