import {TaskListType} from '../../reducers/taskListReducer/Types';

export type SetTaskListsActionType = {
  type: string;
  taskLists: TaskListType[];
};

export type AddNewTaskListActionType = {
  type: string;
  newTaskList: TaskListType;
};

export type AddNewTaskActionType = {
  type: string;
  modifiedTaskList: TaskListType;
};

export type SetTaskDoneActionType = {
  type: string;
  taskListId: string;
  doneTaskId: string;
};

export type DeleteTaskListActionType = {
  type: string;
  taskListId: string;
};

export type DeleteTaskActionType = {
  type: string;
  taskListId: string;
  taskId: string;
};

export type EditTaskListTitleActionType = {
  type: string;
  taskListId: string;
  editedTaskListTitle: string;
};

export type EditTaskTitleActionType = {
  type: string;
  taskListId: string;
  taskId: string;
  editedTaskTitle: string;
};

export type TaskListActionsType = SetTaskListsActionType &
  AddNewTaskListActionType &
  AddNewTaskActionType &
  SetTaskDoneActionType &
  DeleteTaskListActionType &
  DeleteTaskActionType &
  EditTaskListTitleActionType &
  EditTaskTitleActionType;
