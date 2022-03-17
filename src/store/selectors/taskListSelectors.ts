import {TaskListType} from '../reducers/taskListReducer/types';
import {AppRootStateType} from '../store';

export const getTaskList = (state: AppRootStateType): TaskListType[] => {
  return state.taskLists.taskLists;
};
