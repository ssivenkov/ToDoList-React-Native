import { TASKS_REDUCER_ACTION } from '@enums/tasksReducerEnum';
import { NotificationType } from '@store/reducers/tasksReducer/types';

type DeleteTaskActionPayloadType = {
  taskID: NotificationType['taskID'];
};

export type DeleteTaskNotificationActionReturnType = {
  payload: DeleteTaskActionPayloadType;
  type: TASKS_REDUCER_ACTION.DELETE_TASK_NOTIFICATION;
};

export type DeleteTaskNotificationActionType = (
  payload: DeleteTaskActionPayloadType,
) => DeleteTaskNotificationActionReturnType;

export const deleteTaskNotificationAction: DeleteTaskNotificationActionType = (
  payload,
) => ({
  payload,
  type: TASKS_REDUCER_ACTION.DELETE_TASK_NOTIFICATION,
});
