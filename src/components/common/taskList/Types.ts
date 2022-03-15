import {
  TaskListType,
  TaskType,
} from '../../../store/reducers/taskListReducer/Types';
import {NullableType} from '../../../types/common/NullableType';

export type TaskListPropsType = {
  id: string;
  title: string;
  tasks: NullableType<TaskType[]>;
  todo: boolean;
  taskLists: NullableType<TaskListType[]>;
};
