import {TASKS_ACTIONS} from '@enums/tasksEnum';

type SetTasksNotificationsActionPayloadType = {
  notifications: string[];
};

export type SetTasksNotificationsActionReturnType = {
  type: TASKS_ACTIONS.SET_TASKS_NOTIFICATIONS;
  payload: SetTasksNotificationsActionPayloadType;
};

export type SetTasksNotificationsActionType = (
  payload: SetTasksNotificationsActionPayloadType,
) => SetTasksNotificationsActionReturnType;

export const setTasksNotificationsAction: SetTasksNotificationsActionType = (
  payload,
) => ({
  type: TASKS_ACTIONS.SET_TASKS_NOTIFICATIONS,
  payload,
});
