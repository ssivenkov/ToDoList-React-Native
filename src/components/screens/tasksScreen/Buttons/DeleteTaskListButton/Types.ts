import {TaskListType} from '../../../../../store/reducers/taskListReducer/Types';

export type DeleteTaskListButtonPropsType = {
  titleToBeDeletedTaskList: string;
  isTodoTaskList: boolean;
  fullTaskList: TaskListType;
};
