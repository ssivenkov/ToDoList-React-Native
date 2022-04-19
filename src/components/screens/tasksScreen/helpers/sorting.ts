import {TaskListInterface, TaskType} from '@store/reducers/tasksReducer/types';

const _ = require('lodash');

export const sortingTaskLists = (
  taskListsArray: TaskListInterface[],
): TaskListInterface[] => {
  return _.orderBy(taskListsArray, ['date'], ['desc']);
};

export const sortingTasks = (tasksArr: TaskType[]): TaskType[] => {
  return _.orderBy(tasksArr, ['date'], ['desc']);
};
