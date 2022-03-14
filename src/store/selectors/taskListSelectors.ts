import {AppRootStateType} from '../Store';
import {TaskListType} from '../reducers/taskListReducer/Types';

export const getTaskList = (state: AppRootStateType): TaskListType[] => {
  return state.taskLists.taskLists;
};
