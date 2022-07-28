import { TasksReducerStateType } from '@store/reducers/tasksReducer/types';
import { AppRootStateType } from '@store/types';

export const taskListsSelector = (
  state: AppRootStateType,
): TasksReducerStateType['taskLists'] => {
  return state.tasks.taskLists;
};

export const notificationsSelector = (
  state: AppRootStateType,
): TasksReducerStateType['notifications'] => {
  return state.tasks.notifications;
};
