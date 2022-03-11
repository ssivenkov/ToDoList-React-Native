import {NullableType} from '../../../types/common/NullableType';
import {TaskType} from '../../../store/reducers/taskListReducer/Types';

export type TaskListPropsType = {
  id: string;
  title: string;
  tasks: NullableType<TaskType[]>;
  todo?: boolean;
};
