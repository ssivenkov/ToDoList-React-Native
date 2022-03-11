import {TaskListType} from '../../reducers/taskListReducer/Types';

export type SetTaskListsActionType = {
  type: string;
  taskLists: TaskListType[];
};

export type AddNewTaskListActionType = {
  type: string;
  newTaskList: TaskListType;
};

export type DeleteTaskListActionType = {
  type: string;
  taskListId: string;
};

export type EditTaskListTitleActionType = {
  type: string;
  editedTaskList: TaskListType;
};

export type TaskListActionsType = SetTaskListsActionType &
  AddNewTaskListActionType &
  DeleteTaskListActionType &
  EditTaskListTitleActionType;
