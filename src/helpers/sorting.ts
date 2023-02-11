import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';
import orderBy from 'lodash/orderBy';

export const sortingTaskLists = (taskListsArray: TaskListType[]): TaskListType[] => {
  return orderBy(taskListsArray, ['date'], ['desc']);
};

export const sortingTasks = (tasksArr: TaskType[]): TaskType[] => {
  return orderBy(tasksArr, ['date'], ['desc']);
};
