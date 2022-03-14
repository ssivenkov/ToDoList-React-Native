import {AppRootStateType} from '../Store';
import {TaskType} from '../reducers/taskListReducer/Types';
import {NullableType} from '../../types/common/NullableType';

export const tasksSelectorById = (
  state: AppRootStateType,
  id: string,
): NullableType<TaskType[]> | [] =>
  state.taskLists.taskLists.filter((taskList) => taskList.id === id)[0].tasks;
