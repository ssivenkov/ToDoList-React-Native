import { DATE, MODIFICATION_DATE, TITLE } from '@constants/constants';
import { AddTaskNotificationActionReturnType } from '@store/actions/tasksReducerActions/notificationsActions/addTaskNotificationAction';
import { DeleteTaskNotificationActionReturnType } from '@store/actions/tasksReducerActions/notificationsActions/deleteTaskNotificationAction';
import { EditTaskNotificationActionReturnType } from '@store/actions/tasksReducerActions/notificationsActions/editTaskNotificationAction';
import { SetNotificationsActionReturnType } from '@store/actions/tasksReducerActions/notificationsActions/setNotificationsAction';
import { AddNewTaskListActionReturnType } from '@store/actions/tasksReducerActions/taskListsActions/addNewTaskListAction';
import { DeleteTaskListFromScreenActionReturnType } from '@store/actions/tasksReducerActions/taskListsActions/deleteTaskListFromScreenAction';
import { DeleteTaskListFullActionReturnType } from '@store/actions/tasksReducerActions/taskListsActions/deleteTaskListFullAction';
import { EditTaskListSortingActionReturnType } from '@store/actions/tasksReducerActions/taskListsActions/setEditedTaskListSortingAction';
import { EditTaskListTitleActionReturnType } from '@store/actions/tasksReducerActions/taskListsActions/setEditedTaskListTitleAction';
import { SetCollapsedTaskListActionReturnType } from '@store/actions/tasksReducerActions/taskListsActions/setTaskListCollapsedAction';
import { SetTaskListsActionReturnType } from '@store/actions/tasksReducerActions/taskListsActions/setTaskListsAction';
import { AddNewTaskActionReturnType } from '@store/actions/tasksReducerActions/tasksActions/addNewTaskAction';
import { DeleteTaskActionReturnType } from '@store/actions/tasksReducerActions/tasksActions/deleteTaskAction';
import { SetEditedTaskActionReturnType } from '@store/actions/tasksReducerActions/tasksActions/setEditedTaskAction';
import { SetTaskTodoStatusActionReturnType } from '@store/actions/tasksReducerActions/tasksActions/setTaskTodoStatusAction';

export type TaskType = {
  date: string;
  id: string;
  isDone: boolean;
  modificationDate: string;
  title: string;

  colorMark?: string;
};

export type SortingValuesType = typeof DATE | typeof MODIFICATION_DATE | typeof TITLE;

type SortingType = {
  isAscending: boolean;
  isAutosorting: boolean;
  type: SortingValuesType;
};

export type TaskListWithoutTasksType = {
  date: string;
  id: string;
  showInToDo: boolean;
  sorting: SortingType;
  title: string;

  isDoneCollapsed?: boolean;
  isTodoCollapsed?: boolean;
};

export type TaskListType = TaskListWithoutTasksType & {
  tasks?: TaskType[];
};

export type NotificationType = {
  taskID: TaskType['id'];

  date?: Date;
  notificationID?: string;
};

export type TasksReducerStateType = {
  notifications: NotificationType[];
  taskLists: TaskListType[];
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
  | EditTaskListSortingActionReturnType
  | AddNewTaskActionReturnType
  | DeleteTaskActionReturnType
  | SetEditedTaskActionReturnType
  | SetTaskTodoStatusActionReturnType;
