import {TaskListType} from '@store/reducers/tasksReducer/types';
import {AppRootStateType} from '@store/store';

export const getTaskList = (state: AppRootStateType): TaskListType[] => {
  return state.tasks.taskLists;
};
