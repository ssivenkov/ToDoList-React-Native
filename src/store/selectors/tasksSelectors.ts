import {
  NotificationIDType,
  TaskListInterface,
} from '@store/reducers/tasksReducer/types';
import {AppRootStateType} from '@store/store';

export const getTaskLists = (state: AppRootStateType): TaskListInterface[] => {
  return state.tasks.taskLists;
};

export const getNotificationIDs = (
  state: AppRootStateType,
): NotificationIDType[] => {
  return state.tasks.notificationIDs;
};
