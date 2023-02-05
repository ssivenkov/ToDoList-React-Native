import { IconWithScreenBlockingPropsType } from '@components/modals/types';
import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';

export type ToDoTaskButtonPropsType = {
  doneTaskID: TaskType['id'];
  taskListID: TaskListType['id'];
};

export type SetToDoTaskType = IconWithScreenBlockingPropsType['onPress'];
