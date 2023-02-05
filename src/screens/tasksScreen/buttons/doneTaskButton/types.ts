import { IconWithScreenBlockingPropsType } from '@components/modals/types';
import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';

export type DoneTaskButtonPropsType = {
  taskListID: TaskListType['id'];
  toDoTaskID: TaskType['id'];
};

export type SetDoneTaskType = IconWithScreenBlockingPropsType['onPress'];
