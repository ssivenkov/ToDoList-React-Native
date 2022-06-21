import { TASKS_REDUCER_ACTION } from '@enums/tasksReducerEnum';
import { AddTaskNotificationActionReturnType } from '@store/actions/tasksReducerActions/notificationsActions/addTaskNotificationAction';
import { DeleteTaskNotificationActionReturnType } from '@store/actions/tasksReducerActions/notificationsActions/deleteTaskNotificationAction';
import { EditTaskNotificationActionReturnType } from '@store/actions/tasksReducerActions/notificationsActions/editTaskNotificationAction';
import { SetNotificationsActionReturnType } from '@store/actions/tasksReducerActions/notificationsActions/setNotificationsAction';
import { AddNewTaskListActionReturnType } from '@store/actions/tasksReducerActions/taskListsActions/addNewTaskListAction';
import { DeleteTaskListFromScreenActionReturnType } from '@store/actions/tasksReducerActions/taskListsActions/deleteTaskListFromScreenAction';
import { DeleteTaskListFullActionReturnType } from '@store/actions/tasksReducerActions/taskListsActions/deleteTaskListFullAction';
import { EditTaskListTitleActionReturnType } from '@store/actions/tasksReducerActions/taskListsActions/setEditedTaskListTitleAction';
import { SetTaskListsActionReturnType } from '@store/actions/tasksReducerActions/taskListsActions/setTaskListsAction';
import { AddNewTaskActionReturnType } from '@store/actions/tasksReducerActions/tasksActions/addNewTaskAction';
import { DeleteTaskActionReturnType } from '@store/actions/tasksReducerActions/tasksActions/deleteTaskAction';
import { SetEditedTaskActionReturnType } from '@store/actions/tasksReducerActions/tasksActions/setEditedTaskAction';
import { SetTaskIsDoneActionReturnType } from '@store/actions/tasksReducerActions/tasksActions/setTaskIsDoneAction';
import { TasksReducerStateType } from '@store/reducers/tasksReducer/types';

type TasksActionsType =
  | SetTaskListsActionReturnType
  | SetNotificationsActionReturnType
  | AddTaskNotificationActionReturnType
  | DeleteTaskNotificationActionReturnType
  | EditTaskNotificationActionReturnType
  | AddNewTaskListActionReturnType
  | DeleteTaskListFromScreenActionReturnType
  | DeleteTaskListFullActionReturnType
  | EditTaskListTitleActionReturnType
  | AddNewTaskActionReturnType
  | DeleteTaskActionReturnType
  | SetEditedTaskActionReturnType
  | SetTaskIsDoneActionReturnType;

const initialTasksState: TasksReducerStateType = {
  taskLists: [],
  notifications: [],
};

export const tasksReducer = (
  state: TasksReducerStateType = initialTasksState,
  action: TasksActionsType,
): TasksReducerStateType => {
  switch (action.type) {
    case TASKS_REDUCER_ACTION.SET_NOTIFICATIONS:
      return { ...state, notifications: action.payload.notifications };

    case TASKS_REDUCER_ACTION.ADD_TASK_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload.notification],
      };

    case TASKS_REDUCER_ACTION.EDIT_TASK_NOTIFICATION:
      return {
        ...state,
        notifications: [
          ...state.notifications.filter((notification) => {
            return notification.taskID !== action.payload.notification.taskID;
          }),
          action.payload.notification,
        ],
      };

    case TASKS_REDUCER_ACTION.DELETE_TASK_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter((notification) => {
          return notification.taskID !== action.payload.taskID;
        }),
      };

    case TASKS_REDUCER_ACTION.SET_TASK_LISTS:
      return { ...state, taskLists: action.payload.taskLists };

    case TASKS_REDUCER_ACTION.ADD_NEW_TASK_LIST:
      return {
        ...state,
        taskLists: [action.payload.taskList, ...state.taskLists],
      };

    case TASKS_REDUCER_ACTION.ADD_NEW_TASK:
      return {
        ...state,
        taskLists: [
          ...state.taskLists.map((taskList) => {
            const { modifiedTaskList } = action.payload;

            if (taskList.id === modifiedTaskList.id) {
              return modifiedTaskList;
            } else {
              return taskList;
            }
          }),
        ],
      };

    case TASKS_REDUCER_ACTION.DELETE_TASK_LIST_FROM_SCREEN:
      return {
        ...state,
        taskLists: [
          ...state.taskLists.map((taskList) => {
            const { fullTaskList, deleteTodoTask, deleteDoneTask } = action.payload;

            if (taskList.id === fullTaskList.id) {
              const targetTaskList = { ...taskList };

              if (deleteTodoTask) {
                targetTaskList.showInToDo = false;

                if (targetTaskList.tasks) {
                  targetTaskList.tasks = targetTaskList.tasks.filter(
                    (task) => task.isDone,
                  );
                }
              }

              if (deleteDoneTask) {
                targetTaskList.showInToDo = true;

                if (targetTaskList.tasks) {
                  targetTaskList.tasks = targetTaskList.tasks.filter(
                    (task) => !task.isDone,
                  );
                }
              }

              return targetTaskList;
            } else {
              return taskList;
            }
          }),
        ],
      };

    case TASKS_REDUCER_ACTION.DELETE_TASK_LIST_FULL:
      return {
        ...state,
        taskLists: [
          ...state.taskLists.filter(
            (taskList) => taskList.id !== action.payload.taskListID,
          ),
        ],
      };

    case TASKS_REDUCER_ACTION.EDIT_TASK_LIST_TITLE:
      return {
        ...state,
        taskLists: [
          ...state.taskLists.map((taskList) => {
            const { taskListID, editedTaskListTitle } = action.payload;

            if (taskList.id === taskListID) {
              return { ...taskList, title: editedTaskListTitle };
            } else {
              return taskList;
            }
          }),
        ],
      };

    case TASKS_REDUCER_ACTION.SET_TASK_DONE:
      return {
        ...state,
        taskLists: state.taskLists.map((taskList) => {
          const { taskListID, doneTaskID } = action.payload;

          if (taskList.id === taskListID) {
            const targetTaskList = { ...taskList };
            const { tasks } = targetTaskList;

            if (tasks) {
              targetTaskList.tasks = tasks.map((task) => {
                if (task.id === doneTaskID) {
                  return { ...task, isDone: true };
                } else {
                  return task;
                }
              });
            }

            return targetTaskList;
          } else {
            return taskList;
          }
        }),
      };

    case TASKS_REDUCER_ACTION.EDIT_TASK:
      return {
        ...state,
        taskLists: [
          ...state.taskLists.map((taskList) => {
            const { taskListID, taskID, editedTaskTitle, colorMark } = action.payload;

            if (taskList.id === taskListID) {
              const targetTaskList = { ...taskList };
              const { tasks } = targetTaskList;

              if (tasks) {
                targetTaskList.tasks = tasks.map((task) => {
                  if (task.id === taskID) {
                    if (colorMark) {
                      return {
                        ...task,
                        title: editedTaskTitle,
                        colorMark,
                      };
                    } else {
                      const modifiedTask = {
                        ...task,
                        title: editedTaskTitle,
                      };

                      delete modifiedTask.colorMark;

                      return modifiedTask;
                    }
                  } else {
                    return task;
                  }
                });
              }

              return targetTaskList;
            } else {
              return taskList;
            }
          }),
        ],
      };

    case TASKS_REDUCER_ACTION.DELETE_TASK:
      return {
        ...state,
        taskLists: [
          ...state.taskLists.map((taskList) => {
            const { taskListID, taskID } = action.payload;

            if (taskList.id === taskListID) {
              const editedTaskList = { ...taskList };
              const { tasks } = editedTaskList;

              if (tasks) {
                editedTaskList.tasks = tasks.filter((task) => task.id !== taskID);
              }

              return editedTaskList;
            } else {
              return taskList;
            }
          }),
        ],
      };

    default:
      return state;
  }
};
