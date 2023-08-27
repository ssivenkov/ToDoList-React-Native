import { DATE, MODIFICATION_DATE, TITLE } from '@constants/constants';
import { TaskListType } from '@store/reducers/tasksReducer/types';

export const defaultSorting: TaskListType['sorting'] = {
  isAscending: false,
  type: 'date',
  isAutosorting: true,
};

export const sortingTypeVariants: Array<TaskListType['sorting']['type']> = [
  DATE,
  MODIFICATION_DATE,
  TITLE,
];
