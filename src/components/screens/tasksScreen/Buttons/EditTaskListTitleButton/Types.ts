import {TaskType} from '../../../../../store/reducers/taskListReducer/Types';
import {NullableType} from '../../../../../types/common/NullableType';

export type EditTaskListTitleButtonPropsType = {
  oldTitle: string;
  id: string;
  tasks: NullableType<TaskType[]>;
};
