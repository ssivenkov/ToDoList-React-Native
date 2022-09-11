import { AddTaskNotificationActionReturnType } from '@store/actions/tasksReducerActions/notificationsActions/addTaskNotificationAction';
import { DeleteTaskNotificationActionReturnType } from '@store/actions/tasksReducerActions/notificationsActions/deleteTaskNotificationAction';
import { EditTaskNotificationActionReturnType } from '@store/actions/tasksReducerActions/notificationsActions/editTaskNotificationAction';
import { SetNotificationsActionReturnType } from '@store/actions/tasksReducerActions/notificationsActions/setNotificationsAction';
import { AddNewTaskListActionReturnType } from '@store/actions/tasksReducerActions/taskListsActions/addNewTaskListAction';
import { DeleteTaskListFromScreenActionReturnType } from '@store/actions/tasksReducerActions/taskListsActions/deleteTaskListFromScreenAction';
import { DeleteTaskListFullActionReturnType } from '@store/actions/tasksReducerActions/taskListsActions/deleteTaskListFullAction';
import { EditTaskListTitleActionReturnType } from '@store/actions/tasksReducerActions/taskListsActions/setEditedTaskListTitleAction';
import { SetCollapsedTaskListActionReturnType } from '@store/actions/tasksReducerActions/taskListsActions/setTaskListCollapsedAction';
import { SetTaskListsActionReturnType } from '@store/actions/tasksReducerActions/taskListsActions/setTaskListsAction';
import { AddNewTaskActionReturnType } from '@store/actions/tasksReducerActions/tasksActions/addNewTaskAction';
import { DeleteTaskActionReturnType } from '@store/actions/tasksReducerActions/tasksActions/deleteTaskAction';
import { SetEditedTaskActionReturnType } from '@store/actions/tasksReducerActions/tasksActions/setEditedTaskAction';
import { SetTaskIsDoneActionReturnType } from '@store/actions/tasksReducerActions/tasksActions/setTaskIsDoneAction';

export type TaskType = {
  id: string;
  date: string;
  isDone: boolean;
  title: string;

  colorMark?: string;
};

export type TaskListWithoutTasksType = {
  id: string;
  date: string;
  title: string;
  showInToDo: boolean;

  isTodoCollapsed?: boolean;
  isDoneCollapsed?: boolean;
};

type TasksObjectType = {
  [key: string]: TaskType;
};

export interface TaskListBeforeConvertInterface extends TaskListWithoutTasksType {
  tasks?: TasksObjectType;
}

export interface TaskListInterface extends TaskListWithoutTasksType {
  tasks?: TaskType[];
}

export type NotificationType = {
  taskID: TaskType['id'];

  notificationID?: string;
  date?: Date;
};

export type TasksReducerStateType = {
  taskLists: TaskListInterface[];
  notifications: NotificationType[];
};

export type ConvertedTasksForFirebaseType = {
  [T: string]: TaskType;
};

export type TasksReducerActionsType =
  | SetTaskListsActionReturnType
  | SetNotificationsActionReturnType
  | AddTaskNotificationActionReturnType
  | DeleteTaskNotificationActionReturnType
  | EditTaskNotificationActionReturnType
  | AddNewTaskListActionReturnType
  | DeleteTaskListFromScreenActionReturnType
  | DeleteTaskListFullActionReturnType
  | SetCollapsedTaskListActionReturnType
  | EditTaskListTitleActionReturnType
  | AddNewTaskActionReturnType
  | DeleteTaskActionReturnType
  | SetEditedTaskActionReturnType
  | SetTaskIsDoneActionReturnType;
