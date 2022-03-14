import {TaskListActionsType} from 'store/actions/TasksActions/Types';
import {TaskListStateType} from 'store/reducers/taskListReducer/Types';
import {TASK_LIST_ACTIONS} from '../../../enums/TaskListsEnum';

const initialTaskListState: TaskListStateType = {
  taskLists: [
    {
      id: '1',
      title: 'task list 1',
      tasks: [
        {id: '123', isDone: true, title: 'task 1'},
        {id: '545', isDone: false, title: 'task 2'},
        {id: '56778', isDone: false, title: 'task 3'},
      ],
    },
    {
      id: '2',
      title: 'task list 2',
      tasks: [
        {id: '456', isDone: false, title: 'task 1'},
        {id: '2354267', isDone: true, title: 'task 1'},
      ],
    },
  ],
};

export const taskListReducer = (
  state: TaskListStateType = initialTaskListState,
  action: TaskListActionsType,
): TaskListStateType => {
  switch (action.type) {
    case TASK_LIST_ACTIONS.SET_TASK_LISTS:
      return {...state};
    case TASK_LIST_ACTIONS.ADD_NEW_TASK_LIST:
      return {
        ...state,
        taskLists: [...state.taskLists, action.newTaskList],
      };

    case TASK_LIST_ACTIONS.ADD_NEW_TASK:
      return {
        ...state,
        taskLists: [
          ...state.taskLists.filter(
            (taskList) => taskList.id !== action.modifiedTaskList.id,
          ),
          action.modifiedTaskList,
        ],
      };
    case TASK_LIST_ACTIONS.DELETE_TASK_LIST:
      return {
        ...state,
        taskLists: [
          ...state.taskLists.filter(
            (taskList) => taskList.id !== action.taskListId,
          ),
        ],
      };
    case TASK_LIST_ACTIONS.EDIT_TASK_LIST_TITLE:
      return {
        taskLists: [
          ...state.taskLists.filter(
            (taskList) => taskList.id !== action.taskListId,
          ),
        ],
      };

    case TASK_LIST_ACTIONS.SET_TASK_DONE:
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
    case TASK_LIST_ACTIONS.EDIT_TASK_TITLE:
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
    case TASK_LIST_ACTIONS.DELETE_TASK:
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
