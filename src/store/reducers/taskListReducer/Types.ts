import {NullableType} from '../../../types/common/NullableType';

export type TaskType = {
  id: string;
  isDone: boolean;
  title: string;
};

export type TaskListType = {
  id: string;
  title: string;
  tasks: NullableType<TaskType[]>;
};

export type TaskListStateType = {
  taskLists: TaskListType[];
};
