import { TASKS_REDUCER_ACTION } from '@enums/tasksReducerEnum';
import { NotificationType } from '@store/reducers/tasksReducer/types';

type AddTaskNotificationActionPayloadType = {
  notification: NotificationType;
};

export type AddTaskNotificationActionReturnType = {
  payload: AddTaskNotificationActionPayloadType;
  type: TASKS_REDUCER_ACTION.ADD_TASK_NOTIFICATION;
};

export type AddTaskNotificationActionType = (
  payload: AddTaskNotificationActionPayloadType,
) => AddTaskNotificationActionReturnType;

export const addTaskNotificationAction: AddTaskNotificationActionType = (
  payload,
): AddTaskNotificationActionReturnType => ({
  payload,
  type: TASKS_REDUCER_ACTION.ADD_TASK_NOTIFICATION,
});
