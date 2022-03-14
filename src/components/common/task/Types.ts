import {TaskType} from '../../../store/reducers/taskListReducer/Types';
import {NullableType} from '../../../types/common/NullableType';

export type TaskPropsType = {
  todo?: boolean;
  taskListId: string;
  taskListTasks: NullableType<TaskType[]>;
  taskTitle: string;
  taskId: string;
};
