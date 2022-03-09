import {TaskListType} from '../../reducers/taskListsReducer/Types';

export type SetTasksActionsType = {
  type: string;
  tasks: Array<TaskListType>;
};

export type TaskListsActionsType = SetTasksActionsType;
