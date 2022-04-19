import {TASKS_SAGA_ACTIONS} from '@enums/tasksSagaEnum';
import {TaskListInterface, TaskType} from '@store/reducers/tasksReducer/types';

export type CheckUserSagaActionType = {
  type: typeof TASKS_SAGA_ACTIONS.CHECK_USER;
};

export type SyncUserTaskListsSagaActionType = {
  type: typeof TASKS_SAGA_ACTIONS.SYNC_USER_TASK_LISTS;
};

export type AddNewTaskListSagaActionType = {
  type: typeof TASKS_SAGA_ACTIONS.ADD_NEW_TASK_LIST;
  payload: TaskListInterface;
};

export type AddNewTaskPayloadType = {
  modifiedTaskList: TaskListInterface;
  taskListId: string;
  newTask: TaskType;
};

export type AddNewTaskSagaActionType = {
  type: typeof TASKS_SAGA_ACTIONS.ADD_NEW_TASK;
  payload: AddNewTaskPayloadType;
};

export type EditTaskListTitleFullPayloadType = {
  taskListId: string;
  editedTaskListTitle: string;
};

export type EditTaskListTitleFullActionType = {
  type: typeof TASKS_SAGA_ACTIONS.EDIT_TASK_LIST_TITLE;
  payload: EditTaskListTitleFullPayloadType;
};

export type DeleteTaskListFullPayloadType = {
  taskListId: string;
};

export type DeleteTaskListFullActionType = {
  type: typeof TASKS_SAGA_ACTIONS.DELETE_TASK_LIST_FULL;
  payload: DeleteTaskListFullPayloadType;
};

export type DeleteTaskListFromScreenPayloadType = {
  fullTaskList: TaskListInterface;
  deleteTodoTask: boolean;
  deleteDoneTask: boolean;
};

export type DeleteTaskListFromScreenActionType = {
  type: typeof TASKS_SAGA_ACTIONS.DELETE_TASK_LIST_FROM_SCREEN;
  payload: DeleteTaskListFromScreenPayloadType;
};

export type SetTaskIsDonePayloadType = {
  taskListId: string;
  doneTaskId: string;
};

export type SetTaskIsDoneActionType = {
  type: typeof TASKS_SAGA_ACTIONS.SET_TASK_IS_DONE;
  payload: SetTaskIsDonePayloadType;
};

export type SetEditedTaskPayloadType = {
  taskListId: string;
  taskId: string;
  editedTaskTitle: string;
};

export type SetEditedTaskActionType = {
  type: typeof TASKS_SAGA_ACTIONS.SET_EDITED_TASK;
  payload: SetEditedTaskPayloadType;
};

export type DeleteTaskPayloadType = {
  taskListId: string;
  taskId: string;
};

export type DeleteTaskActionType = {
  type: typeof TASKS_SAGA_ACTIONS.DELETE_TASK;
  payload: DeleteTaskPayloadType;
};
