import {TASKS_ACTIONS} from '@enums/tasksEnum';
import {NotificationType} from '@store/reducers/tasksReducer/types';

type SetNotificationsActionPayloadType = {
  notifications: NotificationType[];
};

export type SetNotificationsActionReturnType = {
  type: TASKS_ACTIONS.SET_NOTIFICATIONS;
  payload: SetNotificationsActionPayloadType;
};

export type SetNotificationsActionType = (
  payload: SetNotificationsActionPayloadType,
) => SetNotificationsActionReturnType;

export const setNotificationsAction: SetNotificationsActionType = (
  payload,
) => ({
  type: TASKS_ACTIONS.SET_NOTIFICATIONS,
  payload,
});
