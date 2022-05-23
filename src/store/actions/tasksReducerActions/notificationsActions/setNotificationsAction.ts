import {TASKS_REDUCER_ACTION} from '@enums/tasksReducerEnum';
import {NotificationType} from '@store/reducers/tasksReducer/types';

type SetNotificationsActionPayloadType = {
  notifications: NotificationType[];
};

export type SetNotificationsActionReturnType = {
  type: TASKS_REDUCER_ACTION.SET_NOTIFICATIONS;
  payload: SetNotificationsActionPayloadType;
};

export type SetNotificationsActionType = (
  payload: SetNotificationsActionPayloadType,
) => SetNotificationsActionReturnType;

export const setNotificationsAction: SetNotificationsActionType = (
  payload,
) => ({
  type: TASKS_REDUCER_ACTION.SET_NOTIFICATIONS,
  payload,
});
