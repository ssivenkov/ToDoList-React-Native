import {TASKS_ACTIONS} from '@enums/tasksEnum';
import {AddTaskNotificationActionReturnType} from '@store/actions/tasksReducerActions/notificationsActions/addTaskNotification';
import {DeleteTaskNotificationActionReturnType} from '@store/actions/tasksReducerActions/notificationsActions/deleteTaskNotification';
import {EditTaskNotificationActionReturnType} from '@store/actions/tasksReducerActions/notificationsActions/editTaskNotification';
import {SetNotificationsActionReturnType} from '@store/actions/tasksReducerActions/notificationsActions/setNotifications';
import {SetTasksNotificationsActionReturnType} from '@store/actions/tasksReducerActions/notificationsActions/setTasksNotifications';
import {AddNewTaskListActionReturnType} from '@store/actions/tasksReducerActions/taskListsActions/addNewTaskList';
import {DeleteTaskListFromScreenActionReturnType} from '@store/actions/tasksReducerActions/taskListsActions/deleteTaskListFromScreen';
import {DeleteTaskListFullActionReturnType} from '@store/actions/tasksReducerActions/taskListsActions/deleteTaskListFull';
import {EditTaskListTitleActionReturnType} from '@store/actions/tasksReducerActions/taskListsActions/setEditedTaskListTitle';
import {SetTaskListsActionReturnType} from '@store/actions/tasksReducerActions/taskListsActions/setTaskLists';
import {AddNewTaskActionReturnType} from '@store/actions/tasksReducerActions/tasksActions/addNewTask';
import {DeleteTaskActionReturnType} from '@store/actions/tasksReducerActions/tasksActions/deleteTask';
import {SetEditedTaskActionReturnType} from '@store/actions/tasksReducerActions/tasksActions/setEditedTask';
import {SetTaskIsDoneActionReturnType} from '@store/actions/tasksReducerActions/tasksActions/setTaskIsDone';
import {TasksStateType} from '@store/reducers/tasksReducer/types';

type TasksActionsType =
  | SetTaskListsActionReturnType
  | SetNotificationsActionReturnType
  | AddTaskNotificationActionReturnType
  | DeleteTaskNotificationActionReturnType
  | EditTaskNotificationActionReturnType
  | SetTasksNotificationsActionReturnType
  | AddNewTaskListActionReturnType
  | DeleteTaskListFromScreenActionReturnType
  | DeleteTaskListFullActionReturnType
  | EditTaskListTitleActionReturnType
  | AddNewTaskActionReturnType
  | DeleteTaskActionReturnType
  | SetEditedTaskActionReturnType
  | SetTaskIsDoneActionReturnType;

const initialTasksState: TasksStateType = {
  taskLists: [],
  notifications: [],
};

export const tasksReducer = (
  state: TasksStateType = initialTasksState,
  action: TasksActionsType,
): TasksStateType => {
  switch (action.type) {
    case TASKS_ACTIONS.SET_TASK_LISTS:
      return {...state, taskLists: action.payload.taskLists};

    case TASKS_ACTIONS.SET_NOTIFICATIONS:
      return {...state, notifications: action.payload.notifications};

    case TASKS_ACTIONS.DELETE_TASK_NOTIFICATION:
      return {
        ...state,
        notifications: [
          ...state.notifications.filter((notification) => {
            return notification.taskID !== action.payload.taskID;
          }),
        ],
      };

    case TASKS_ACTIONS.ADD_NEW_TASK_LIST:
      return {
        ...state,
        taskLists: [action.payload.taskList, ...state.taskLists],
      };

    case TASKS_ACTIONS.ADD_NEW_TASK:
      return {
        ...state,
        taskLists: [
          ...state.taskLists.map((taskList) => {
            if (taskList.id === action.payload.taskListId) {
              return action.payload.modifiedTaskList;
            } else return taskList;
          }),
        ],
      };

    case TASKS_ACTIONS.SET_TASKS_NOTIFICATIONS:
      return {
        ...state,
        notifications: [
          ...state.notifications.filter((notification) => {
            const notificationToDelete =
              action.payload.notifications
                .join(',')
                .indexOf(notification.taskID) > -1;
            if (!notificationToDelete) return true;
          }),
        ],
      };

    case TASKS_ACTIONS.ADD_TASK_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload.notification],
      };

    case TASKS_ACTIONS.EDIT_TASK_NOTIFICATION:
      return {
        ...state,
        notifications: [
          ...state.notifications.filter((notification) => {
            return notification.taskID !== action.payload.notification.taskID;
          }),
          action.payload.notification,
        ],
      };

    case TASKS_ACTIONS.DELETE_TASK_LIST_FROM_SCREEN:
      return {
        ...state,
        taskLists: [
          ...state.taskLists.map((taskList) => {
            if (taskList.id === action.payload.fullTaskList.id) {
              const targetTaskList = {...taskList};

              if (action.payload.deleteTodoTask) {
                targetTaskList.showInToDo = false;

                if (targetTaskList.tasks) {
                  targetTaskList.tasks = targetTaskList.tasks.filter(
                    (task) => task.isDone,
                  );
                }
              }
              if (action.payload.deleteDoneTask) {
                targetTaskList.showInToDo = true;

                if (targetTaskList.tasks) {
                  targetTaskList.tasks = targetTaskList.tasks.filter(
                    (task) => !task.isDone,
                  );
                }
              }
              return targetTaskList;
            } else return taskList;
          }),
        ],
      };

    case TASKS_ACTIONS.DELETE_TASK_LIST_FULL:
      return {
        ...state,
        taskLists: [
          ...state.taskLists.filter(
            (taskList) => taskList.id !== action.payload.taskListId,
          ),
        ],
      };

    case TASKS_ACTIONS.EDIT_TASK_LIST_TITLE:
      return {
        ...state,
        taskLists: [
          ...state.taskLists.map((taskList) => {
            if (taskList.id === action.payload.taskListId) {
              const editedTaskList = {...taskList};
              editedTaskList.title = action.payload.editedTaskListTitle;
              return editedTaskList;
            } else return taskList;
          }),
        ],
      };

    case TASKS_ACTIONS.SET_TASK_DONE:
      return {
        ...state,
        taskLists: [
          ...state.taskLists.map((taskList) => {
            if (taskList.id === action.payload.taskListId) {
              const targetTaskList = {...taskList};

              if (targetTaskList.tasks) {
                targetTaskList.tasks = targetTaskList.tasks.map((task) => {
                  if (task.id === action.payload.doneTaskId) {
                    const doneTask = {...task};
                    doneTask.isDone = true;
                    return doneTask;
                  } else return task;
                });
              }
              return targetTaskList;
            } else return taskList;
          }),
        ],
      };

    case TASKS_ACTIONS.EDIT_TASK_TITLE:
      return {
        ...state,
        taskLists: [
          ...state.taskLists.map((taskList) => {
            if (taskList.id === action.payload.taskListId) {
              const targetTaskList = {...taskList};

              if (targetTaskList.tasks) {
                targetTaskList.tasks = targetTaskList.tasks.map((task) => {
                  if (task.id === action.payload.taskId) {
                    const editedTask = {...task};
                    editedTask.title = action.payload.editedTaskTitle;
                    return editedTask;
                  }
                  return task;
                });
              }
              return targetTaskList;
            } else return taskList;
          }),
        ],
      };

    case TASKS_ACTIONS.DELETE_TASK:
      return {
        ...state,
        taskLists: [
          ...state.taskLists.map((taskList) => {
            if (taskList.id === action.payload.taskListId) {
              const editedTaskList = {...taskList};

              if (editedTaskList.tasks) {
                editedTaskList.tasks = editedTaskList.tasks.filter(
                  (task) => task.id !== action.payload.taskId,
                );
              }
              return editedTaskList;
            } else return taskList;
          }),
        ],
      };

    default:
      return state;
  }
};
