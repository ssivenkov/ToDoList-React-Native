import { TASKS_REDUCER_ACTION } from '@enums/tasksReducerEnum';
import { sortingTasks } from '@helpers/sorting';
import {
  TasksReducerActionsType,
  TasksReducerStateType,
} from '@store/reducers/tasksReducer/types';

const tasksReducerState: TasksReducerStateType = {
  notifications: [],
  taskLists: [],
};

export const tasksReducer = (
  state = tasksReducerState,
  action: TasksReducerActionsType,
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
      return {
        ...state,
        taskLists: action.payload.taskLists.map((taskList) => {
          const targetTaskList = { ...taskList };

          if (targetTaskList.tasks && targetTaskList.sorting) {
            targetTaskList.tasks = sortingTasks(
              targetTaskList.sorting,
              targetTaskList.tasks,
            );
          }

          return targetTaskList;
        }),
      };

    case TASKS_REDUCER_ACTION.ADD_NEW_TASK_LIST:
      return {
        ...state,
        taskLists: [action.payload.taskList, ...state.taskLists],
      };

    case TASKS_REDUCER_ACTION.ADD_NEW_TASK:
      return {
        ...state,
        taskLists: state.taskLists.map((taskList) => {
          const { modifiedTaskList } = action.payload;

          if (taskList.id === modifiedTaskList.id) {
            const resultTaskList = { ...modifiedTaskList };

            if (resultTaskList.tasks && resultTaskList.sorting.isAutosorting) {
              const { tasks, sorting } = resultTaskList;

              resultTaskList.tasks = sortingTasks(sorting, tasks);
            }

            return resultTaskList;
          } else {
            return taskList;
          }
        }),
      };

    case TASKS_REDUCER_ACTION.DELETE_TASK_LIST_FROM_SCREEN:
      return {
        ...state,
        taskLists: state.taskLists.map((taskList) => {
          const { fullTaskList, deleteTodoTask, deleteDoneTask } = action.payload;

          if (taskList.id === fullTaskList.id) {
            const targetTaskList = { ...taskList };

            if (deleteTodoTask) {
              targetTaskList.showInToDo = false;

              if (targetTaskList.tasks) {
                targetTaskList.tasks = targetTaskList.tasks.filter((task) => task.isDone);
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
      };

    case TASKS_REDUCER_ACTION.DELETE_TASK_LIST_FULL:
      return {
        ...state,
        taskLists: state.taskLists.filter(
          (taskList) => taskList.id !== action.payload.taskListID,
        ),
      };

    case TASKS_REDUCER_ACTION.SET_COLLAPSED_TASK_LIST:
      return {
        ...state,
        taskLists: state.taskLists.map((taskList) => {
          const { taskListID, isTodoCollapsed, isDoneCollapsed } = action.payload;

          if (taskList.id === taskListID) {
            return {
              ...taskList,
              isDoneCollapsed: isDoneCollapsed,
              isTodoCollapsed: isTodoCollapsed,
            };
          } else {
            return taskList;
          }
        }),
      };

    case TASKS_REDUCER_ACTION.EDIT_TASK_LIST_TITLE:
      return {
        ...state,
        taskLists: state.taskLists.map((taskList) => {
          const { taskListID, editedTaskListTitle } = action.payload;

          if (taskList.id === taskListID) {
            return { ...taskList, title: editedTaskListTitle };
          } else {
            return taskList;
          }
        }),
      };

    case TASKS_REDUCER_ACTION.EDIT_TASK_LIST_SORTING:
      return {
        ...state,
        taskLists: state.taskLists.map((taskList) => {
          const { taskListID, editedTaskListSorting } = action.payload;

          if (
            taskList.id === taskListID &&
            taskList.tasks &&
            taskList.tasks.length !== 0
          ) {
            const { tasks } = taskList;

            return {
              ...taskList,
              sorting: editedTaskListSorting,
              tasks: sortingTasks(editedTaskListSorting, tasks),
            };
          } else if (taskList.id === taskListID) {
            return {
              ...taskList,
              sorting: editedTaskListSorting,
            };
          } else {
            return taskList;
          }
        }),
      };

    case TASKS_REDUCER_ACTION.SET_TASK_TODO_STATUS:
      return {
        ...state,
        taskLists: state.taskLists.map((taskList) => {
          const { taskListID, taskID, isDone, modificationDate } = action.payload;

          if (taskList.id === taskListID && taskList.tasks && taskList.tasks.length > 0) {
            let modifiedTasks = taskList.tasks.map((task) => {
              if (task.id === taskID) {
                return {
                  ...task,
                  isDone,
                  modificationDate,
                };
              } else {
                return task;
              }
            });

            if (taskList.sorting.isAutosorting) {
              modifiedTasks = sortingTasks(taskList.sorting, modifiedTasks);
            }

            return { ...taskList, tasks: modifiedTasks };
          } else {
            return taskList;
          }
        }),
      };

    case TASKS_REDUCER_ACTION.EDIT_TASK:
      return {
        ...state,
        taskLists: state.taskLists.map((taskList) => {
          const { taskListID, taskID, editedTaskTitle, colorMark, modificationDate } =
            action.payload;

          if (taskList.id === taskListID && taskList.tasks && taskList.tasks.length > 0) {
            let modifiedTasks = taskList.tasks.map((task) => {
              if (task.id === taskID) {
                const modifiedTask = {
                  ...task,
                  title: editedTaskTitle,
                  modificationDate,
                };

                if (colorMark) {
                  modifiedTask.colorMark = colorMark;
                }

                return modifiedTask;
              } else {
                return task;
              }
            });

            if (taskList.sorting.isAutosorting) {
              modifiedTasks = sortingTasks(taskList.sorting, modifiedTasks);
            }

            return { ...taskList, tasks: modifiedTasks };
          } else {
            return taskList;
          }
        }),
      };

    case TASKS_REDUCER_ACTION.DELETE_TASK:
      return {
        ...state,
        taskLists: state.taskLists.map((taskList) => {
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
      };

    default:
      return state;
  }
};
