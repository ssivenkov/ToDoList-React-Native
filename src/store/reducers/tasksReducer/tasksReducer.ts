import {TASKS_ACTIONS} from '@enums/tasksEnum';
import {TasksActionsType} from '@store/actions/tasksActions/types';
import {TasksStateType} from '@store/reducers/tasksReducer/types';

const initialTasksState: TasksStateType = {
  taskLists: [],
};

export const tasksReducer = (
  state: TasksStateType = initialTasksState,
  action: TasksActionsType,
): TasksStateType => {
  switch (action.type) {
    case TASKS_ACTIONS.SET_TASK_LISTS:
      return {...state, taskLists: action.taskLists};

    case TASKS_ACTIONS.ADD_NEW_TASK_LIST:
      return {
        ...state,
        taskLists: [action.newTaskList, ...state.taskLists],
      };

    case TASKS_ACTIONS.ADD_NEW_TASK:
      return {
        ...state,
        taskLists: [
          ...state.taskLists.map((taskList) => {
            if (taskList.id === action.taskListId) {
              return action.modifiedTaskList;
            } else return taskList;
          }),
        ],
      };

    case TASKS_ACTIONS.DELETE_TASK_LIST_FROM_SCREEN:
      return {
        ...state,
        taskLists: [
          ...state.taskLists.map((taskList) => {
            if (taskList.id === action.fullTaskList.id) {
              const targetTaskList = {...taskList};

              if (action.deleteTodoTask) {
                targetTaskList.showInToDo = false;

                if (targetTaskList.tasks) {
                  targetTaskList.tasks = targetTaskList.tasks.filter(
                    (task) => task.isDone,
                  );
                }
              }
              if (action.deleteDoneTask) {
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
            (taskList) => taskList.id !== action.taskListId,
          ),
        ],
      };

    case TASKS_ACTIONS.EDIT_TASK_LIST_TITLE:
      return {
        taskLists: [
          ...state.taskLists.map((taskList) => {
            if (taskList.id === action.taskListId) {
              const editedTaskList = {...taskList};
              editedTaskList.title = action.editedTaskListTitle;
              return editedTaskList;
            } else return taskList;
          }),
        ],
      };

    case TASKS_ACTIONS.SET_TASK_DONE:
      return {
        taskLists: [
          ...state.taskLists.map((taskList) => {
            if (taskList.id === action.taskListId) {
              const targetTaskList = {...taskList};

              if (targetTaskList.tasks) {
                targetTaskList.tasks = targetTaskList.tasks.map((task) => {
                  if (task.id === action.doneTaskId) {
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
            if (taskList.id === action.taskListId) {
              const targetTaskList = {...taskList};

              if (targetTaskList.tasks) {
                targetTaskList.tasks = targetTaskList.tasks.map((task) => {
                  if (task.id === action.taskId) {
                    const editedTask = {...task};
                    editedTask.title = action.editedTaskTitle;
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
            if (taskList.id === action.taskListId) {
              const editedTaskList = {...taskList};

              if (editedTaskList.tasks) {
                editedTaskList.tasks = editedTaskList.tasks.filter(
                  (task) => task.id !== action.taskId,
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
