import {TaskListType} from '../../../../../store/reducers/taskListReducer/types';

export type DeleteTaskListButtonPropsType = {
  titleToBeDeletedTaskList: string;
  isTodoTaskList: boolean;
  fullTaskList: TaskListType;
};
