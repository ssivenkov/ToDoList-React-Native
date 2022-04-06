import {TASKS_ACTIONS} from '@enums/tasksEnum';
import {TasksActionsType} from '@store/actions/tasksActions/types';
import {TasksStateType} from '@store/reducers/tasksReducer/types';

const initialTasksState: TasksStateType = {
  taskLists: [
    {
      id: '1',
      title: 'task list 1',
      showInToDo: true,
      tasks: [
        {id: '123', isDone: false, title: 'task 1'},
        {id: '027', isDone: true, title: 'task 2'},
      ],
    },
  ],
};

export const tasksReducer = (
  state: TasksStateType = initialTasksState,
  action: TasksActionsType,
): TasksStateType => {
  switch (action.type) {
    case TASKS_ACTIONS.SET_TASK_LISTS:
      return {...state};

    case TASKS_ACTIONS.ADD_NEW_TASK_LIST:
      return {
        ...state,
        taskLists: [...state.taskLists, action.newTaskList],
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
              const conditionTaskList = {...taskList};
              if (action.deleteTodoTask) {
                conditionTaskList.showInToDo = false;
                conditionTaskList.tasks = conditionTaskList.tasks.filter(
                  (task) => task.isDone,
                );
              }
              if (action.deleteDoneTask) {
                conditionTaskList.showInToDo = true;
                conditionTaskList.tasks = conditionTaskList.tasks.filter(
                  (task) => !task.isDone,
                );
              }
              return conditionTaskList;
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
              const taskListWithDoneTask = {...taskList};
              if (taskListWithDoneTask.tasks) {
                taskListWithDoneTask.tasks = taskListWithDoneTask.tasks.map(
                  (task) => {
                    if (task.id === action.doneTaskId) {
                      const doneTask = {...task};
                      doneTask.isDone = true;
                      return doneTask;
                    } else return task;
                  },
                );
              }
              return taskListWithDoneTask;
            } else return taskList;
          }),
        ],
      };

    case TASKS_ACTIONS.EDIT_TASK_TITLE:
      return {
        ...state,
        taskLists: [
          ...state.taskLists.map((taskList) => {
            if (taskList.tasks && taskList.id === action.taskListId) {
              const editedTaskList = {...taskList};
              if (editedTaskList.tasks) {
                editedTaskList.tasks = editedTaskList.tasks.map((task) => {
                  if (task.id === action.taskId) {
                    const editedTask = {...task};
                    editedTask.title = action.editedTaskTitle;
                    return editedTask;
                  }
                  return task;
                });
              }
              return editedTaskList;
            } else return taskList;
          }),
        ],
      };

    case TASKS_ACTIONS.DELETE_TASK:
      return {
        ...state,
        taskLists: [
          ...state.taskLists.map((taskList) => {
            if (taskList.tasks && taskList.id === action.taskListId) {
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
