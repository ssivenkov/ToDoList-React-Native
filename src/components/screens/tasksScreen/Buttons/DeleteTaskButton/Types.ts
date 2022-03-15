import {
  TaskListType,
  TaskType,
} from '../../../../../store/reducers/taskListReducer/Types';
import {NullableType} from '../../../../../types/common/NullableType';

export type DeleteTaskButtonPropsType = {
  isTodoTaskList: boolean;
  taskListId: string;
  taskListTasks: NullableType<TaskType[]>;
  taskId: string;
  taskTitle: string;
  taskLists: NullableType<TaskListType[]>;
};
