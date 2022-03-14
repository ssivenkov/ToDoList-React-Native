import {TaskType} from '../../../../../store/reducers/taskListReducer/Types';
import {NullableType} from '../../../../../types/common/NullableType';

export type CreateTaskButtonPropsType = {
  taskListId: string;
  taskListTitle: string;
  tasks: NullableType<TaskType[]>;
};
