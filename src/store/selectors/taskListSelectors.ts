import {TaskListType} from '@store/reducers/taskListReducer/types';
import {AppRootStateType} from '@store/store';

export const getTaskList = (state: AppRootStateType): TaskListType[] => {
  return state.taskLists.taskLists;
};
