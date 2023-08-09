import { IconWithScreenBlockingPropsType } from '@components/modals/types';
import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';

export type ToDoTaskButtonPropsType = {
  taskID: TaskType['id'];
  taskListID: TaskListType['id'];
  taskTitle: TaskType['title'];
};

export type SetToDoTaskType = IconWithScreenBlockingPropsType['onPress'];
