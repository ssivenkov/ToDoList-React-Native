import {
  NotificationType,
  TaskListInterface,
} from '@store/reducers/tasksReducer/types';
import {AppRootStateType} from '@store/store';

export const getTaskLists = (state: AppRootStateType): TaskListInterface[] => {
  return state.tasks.taskLists;
};

export const getNotifications = (
  state: AppRootStateType,
): NotificationType[] => {
  return state.tasks.notifications;
};
