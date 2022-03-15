import {
  TaskListType,
  TaskType,
} from '../../../store/reducers/taskListReducer/Types';
import {NullableType} from '../../../types/common/NullableType';

export type TaskPropsType = {
  isTodo: boolean;
  taskListId: string;
  taskListTasks: NullableType<TaskType[]>;
  taskTitle: string;
  taskId: string;
  taskLists: NullableType<TaskListType[]>;
};
