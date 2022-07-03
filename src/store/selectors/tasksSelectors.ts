import { NotificationType, TaskListInterface } from '@store/reducers/tasksReducer/types';
import { AppRootStateType } from '@store/types';

export const taskListsSelector = (state: AppRootStateType): TaskListInterface[] => {
  return state.tasks.taskLists;
};

export const notificationsSelector = (state: AppRootStateType): NotificationType[] => {
  return state.tasks.notifications;
};
