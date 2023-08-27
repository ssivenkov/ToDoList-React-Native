import { IconWithScreenBlockingPropsType } from '@components/modals/types';
import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';

export type DoneTaskButtonPropsType = {
  taskID: TaskType['id'];
  taskListID: TaskListType['id'];
  taskTitle: TaskType['title'];
};

export type SetDoneTaskType = IconWithScreenBlockingPropsType['onPress'];
