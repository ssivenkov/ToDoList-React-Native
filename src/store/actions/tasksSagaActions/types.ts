import {TASKS_SAGA_ACTIONS} from '@enums/tasksSagaEnum';
import {SetStateType} from '@root/types/common/types';
import {
  TaskListInterface,
  TaskListWithTaskType,
  TaskType,
} from '@store/reducers/tasksReducer/types';

export type CheckUserSagaActionType = {
  type: typeof TASKS_SAGA_ACTIONS.CHECK_USER;
};

export type SyncUserTaskListsSagaActionType = {
  type: typeof TASKS_SAGA_ACTIONS.SYNC_USER_TASK_LISTS;
};

export type AddNewTaskListPayloadType = {
  newTaskList: TaskListWithTaskType;
  setIsLoading: SetStateType<boolean>;
  setModalVisible: SetStateType<boolean>;
  setNewTaskListTitle: SetStateType<string>;
};

export type AddNewTaskListSagaActionType = {
  type: typeof TASKS_SAGA_ACTIONS.ADD_NEW_TASK_LIST;
  payload: AddNewTaskListPayloadType;
};

export type AddNewTaskPayloadType = {
  modifiedTaskList: TaskListInterface;
  taskListId: string;
  newTask: TaskType;
  shouldCreateNotification: boolean;
  date: Date;
  setIsLoading: SetStateType<boolean>;
  setModalVisible: SetStateType<boolean>;
  setNewTaskTitle: SetStateType<string>;
};

export type AddNewTaskSagaActionType = {
  type: typeof TASKS_SAGA_ACTIONS.ADD_NEW_TASK;
  payload: AddNewTaskPayloadType;
};

export type EditTaskListTitleFullPayloadType = {
  taskListId: string;
  editedTaskListTitle: string;
  setIsLoading: SetStateType<boolean>;
  setModalVisible: SetStateType<boolean>;
  setEditedTaskListTitleState: SetStateType<string>;
};

export type EditTaskListTitleFullActionType = {
  type: typeof TASKS_SAGA_ACTIONS.EDIT_TASK_LIST_TITLE;
  payload: EditTaskListTitleFullPayloadType;
};

export type DeleteTaskListFullPayloadType = {
  taskListId: string;
  setIsLoading: SetStateType<boolean>;
  setModalVisible: SetStateType<boolean>;
};

export type DeleteTaskListFullActionType = {
  type: typeof TASKS_SAGA_ACTIONS.DELETE_TASK_LIST_FULL;
  payload: DeleteTaskListFullPayloadType;
};

export type DeleteTaskListFromScreenPayloadType = {
  fullTaskList: TaskListInterface;
  deleteTodoTask: boolean;
  deleteDoneTask: boolean;
  setIsLoading: SetStateType<boolean>;
  setModalVisible: SetStateType<boolean>;
};

export type DeleteTaskListFromScreenActionType = {
  type: typeof TASKS_SAGA_ACTIONS.DELETE_TASK_LIST_FROM_SCREEN;
  payload: DeleteTaskListFromScreenPayloadType;
};

export type SetTaskIsDonePayloadType = {
  taskListId: string;
  doneTaskId: string;
  setIsLoading: SetStateType<boolean>;
  setModalVisible: SetStateType<boolean>;
};

export type SetTaskIsDoneActionType = {
  type: typeof TASKS_SAGA_ACTIONS.SET_TASK_IS_DONE;
  payload: SetTaskIsDonePayloadType;
};

export type SetEditedTaskPayloadType = {
  taskListId: string;
  taskId: string;
  editedTaskTitle: string;
  setIsLoading: SetStateType<boolean>;
  setModalVisible: SetStateType<boolean>;
  setEditedTaskTitle: SetStateType<string>;
};

export type SetEditedTaskActionType = {
  type: typeof TASKS_SAGA_ACTIONS.SET_EDITED_TASK;
  payload: SetEditedTaskPayloadType;
};

export type DeleteTaskPayloadType = {
  taskListId: string;
  taskId: string;
  setIsLoading: SetStateType<boolean>;
  setModalVisible: SetStateType<boolean>;
};

export type DeleteTaskActionType = {
  type: typeof TASKS_SAGA_ACTIONS.DELETE_TASK;
  payload: DeleteTaskPayloadType;
};
