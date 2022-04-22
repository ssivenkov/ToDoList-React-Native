import {TASKS_SAGA_ACTIONS} from '@enums/tasksSagaEnum';
import {
  AddNewTaskListPayloadType,
  AddNewTaskListSagaActionType,
  AddNewTaskPayloadType,
  AddNewTaskSagaActionType,
  CheckUserSagaActionType,
  DeleteTaskActionType,
  DeleteTaskListFromScreenActionType,
  DeleteTaskListFromScreenPayloadType,
  DeleteTaskListFullActionType,
  DeleteTaskListFullPayloadType,
  DeleteTaskPayloadType,
  EditTaskListTitleFullActionType,
  EditTaskListTitleFullPayloadType,
  SetEditedTaskActionType,
  SetEditedTaskPayloadType,
  SetTaskIsDoneActionType,
  SetTaskIsDonePayloadType,
  SyncUserTaskListsSagaActionType,
} from '@store/actions/tasksSagaActions/types';

export const checkUser = (): CheckUserSagaActionType => ({
  type: TASKS_SAGA_ACTIONS.CHECK_USER,
});

export const syncUserTaskLists = (): SyncUserTaskListsSagaActionType => ({
  type: TASKS_SAGA_ACTIONS.SYNC_USER_TASK_LISTS,
});

export const addNewTaskList = (
  payload: AddNewTaskListPayloadType,
): AddNewTaskListSagaActionType => ({
  type: TASKS_SAGA_ACTIONS.ADD_NEW_TASK_LIST,
  payload,
});

export const addNewTask = (
  payload: AddNewTaskPayloadType,
): AddNewTaskSagaActionType => ({
  type: TASKS_SAGA_ACTIONS.ADD_NEW_TASK,
  payload,
});

export const editTaskListTitle = (
  payload: EditTaskListTitleFullPayloadType,
): EditTaskListTitleFullActionType => ({
  type: TASKS_SAGA_ACTIONS.EDIT_TASK_LIST_TITLE,
  payload,
});

export const deleteTaskListFull = (
  payload: DeleteTaskListFullPayloadType,
): DeleteTaskListFullActionType => ({
  type: TASKS_SAGA_ACTIONS.DELETE_TASK_LIST_FULL,
  payload,
});

export const deleteTaskListFromScreen = (
  payload: DeleteTaskListFromScreenPayloadType,
): DeleteTaskListFromScreenActionType => ({
  type: TASKS_SAGA_ACTIONS.DELETE_TASK_LIST_FROM_SCREEN,
  payload,
});

export const setTaskIsDone = (
  payload: SetTaskIsDonePayloadType,
): SetTaskIsDoneActionType => ({
  type: TASKS_SAGA_ACTIONS.SET_TASK_IS_DONE,
  payload,
});

export const setEditedTask = (
  payload: SetEditedTaskPayloadType,
): SetEditedTaskActionType => ({
  type: TASKS_SAGA_ACTIONS.SET_EDITED_TASK,
  payload,
});

export const deleteTask = (
  payload: DeleteTaskPayloadType,
): DeleteTaskActionType => ({
  type: TASKS_SAGA_ACTIONS.DELETE_TASK,
  payload,
});
