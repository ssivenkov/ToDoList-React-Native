import {TaskListInterface} from '@store/reducers/tasksReducer/types';
import {AppRootStateType} from '@store/store';

export const getTaskList = (state: AppRootStateType): TaskListInterface[] => {
  return state.tasks.taskLists;
};
