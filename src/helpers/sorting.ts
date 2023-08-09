import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';
import orderBy from 'lodash/orderBy';

export const sortingTaskLists = (taskLists: TaskListType[]): TaskListType[] => {
  return orderBy(taskLists, ['date'], ['desc']);
};

export const sortingTasks = (sorting: TaskListType['sorting'], tasks: TaskType[]) => {
  return orderBy(tasks, [sorting.type], [sorting.isAscending ? 'asc' : 'desc']);
};
