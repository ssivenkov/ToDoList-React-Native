import {
  NotificationIDType,
  TaskListInterface,
} from '@store/reducers/tasksReducer/types';

export type SetTaskListsActionType = {
  type: string;
  taskLists: TaskListInterface[];
};

export type SetNotificationIDsActionType = {
  type: string;
  notifications: NotificationIDType[];
};

export type AddNewTaskListActionType = {
  type: string;
  newTaskList: TaskListInterface;
};

export type AddNewTaskActionType = {
  type: string;
  modifiedTaskList: TaskListInterface;
  taskListId: string;
};

export type SetTasksNotificationsActionType = {
  type: string;
  tasksIDArr: string[];
};

export type TaskNotificationActionType = {
  type: string;
  payload: NotificationIDType;
};

export type DeleteTaskNotificationActionType = {
  type: string;
  taskID: string;
};

export type SetTaskDoneActionType = {
  type: string;
  taskListId: string;
  doneTaskId: string;
};

export type DeleteTaskListActionType = {
  type: string;
  fullTaskList: TaskListInterface;
  deleteTodoTask: boolean;
  deleteDoneTask: boolean;
};

export type DeleteTaskListFullActionType = {
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

export type TasksActionsType = SetTaskListsActionType &
  SetNotificationIDsActionType &
  AddNewTaskListActionType &
  AddNewTaskActionType &
  SetTasksNotificationsActionType &
  TaskNotificationActionType &
  DeleteTaskNotificationActionType &
  SetTaskDoneActionType &
  DeleteTaskListActionType &
  DeleteTaskActionType &
  EditTaskListTitleActionType &
  DeleteTaskListFullActionType &
  EditTaskTitleActionType;
