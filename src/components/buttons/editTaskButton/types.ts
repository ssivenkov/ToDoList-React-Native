import {TaskListInterface, TaskType} from '@store/reducers/tasksReducer/types';
import {ColorType} from '@store/reducers/userReducer/types';

export type EditTaskTitleButtonPropsType = {
  taskListID: TaskListInterface['id'];
  taskID: TaskType['id'];
  oldTaskTitle: TaskType['title'];
  colorMark?: ColorType;
  isTodo: boolean;
};
