import {TaskType} from '../../../../../store/reducers/taskListReducer/Types';
import {NullableType} from '../../../../../types/common/NullableType';

export type DeleteTaskListButtonPropsType = {
  taskListId: string;
  titleToBeDeletedTaskList: string;
  isTodoTaskList: boolean;
  taskListTasks: NullableType<TaskType[]>;
};
