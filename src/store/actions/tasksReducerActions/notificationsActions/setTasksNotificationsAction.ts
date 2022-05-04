import {TASKS_ACTION} from '@enums/tasksEnum';

type SetTasksNotificationsActionPayloadType = {
  notificationTaskIDs: string[];
};

export type SetTasksNotificationsActionReturnType = {
  type: TASKS_ACTION.SET_TASKS_NOTIFICATIONS;
  payload: SetTasksNotificationsActionPayloadType;
};

export type SetTasksNotificationsActionType = (
  payload: SetTasksNotificationsActionPayloadType,
) => SetTasksNotificationsActionReturnType;

export const setTasksNotificationsAction: SetTasksNotificationsActionType = (
  payload,
) => ({
  type: TASKS_ACTION.SET_TASKS_NOTIFICATIONS,
  payload,
});
