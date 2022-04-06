import {TASKS_ACTIONS} from '@enums/tasksEnum';
import {
  AddNewTaskActionType,
  AddNewTaskListActionType,
  DeleteTaskActionType,
  DeleteTaskListActionType,
  DeleteTaskListFullActionType,
  EditTaskListTitleActionType,
  EditTaskTitleActionType,
  SetTaskDoneActionType,
  SetTaskListsActionType,
} from '@store/actions/tasksActions/types';
import {TaskListType} from '@store/reducers/tasksReducer/types';

export const setTaskLists = (
  taskLists: TaskListType[],
): SetTaskListsActionType => ({
  type: TASKS_ACTIONS.SET_TASK_LISTS,
  taskLists,
});

export const addNewTaskList = (
  newTaskList: TaskListType,
): AddNewTaskListActionType => ({
  type: TASKS_ACTIONS.ADD_NEW_TASK_LIST,
  newTaskList,
});

export const addNewTask = (
  modifiedTaskList: TaskListType,
  taskListId: string,
): AddNewTaskActionType => ({
  type: TASKS_ACTIONS.ADD_NEW_TASK,
  modifiedTaskList,
  taskListId,
});

export const setEditedTaskListTitle = (
  taskListId: string,
  editedTaskListTitle: string,
): EditTaskListTitleActionType => ({
  type: TASKS_ACTIONS.EDIT_TASK_LIST_TITLE,
  taskListId,
  editedTaskListTitle,
});

export const deleteTaskListFromScreen = (
  fullTaskList: TaskListType,
  deleteTodoTask: boolean,
  deleteDoneTask: boolean,
): DeleteTaskListActionType => ({
  type: TASKS_ACTIONS.DELETE_TASK_LIST_FROM_SCREEN,
  fullTaskList,
  deleteTodoTask,
  deleteDoneTask,
});

export const deleteTaskListFull = (
  taskListId: string,
): DeleteTaskListFullActionType => ({
  type: TASKS_ACTIONS.DELETE_TASK_LIST_FULL,
  taskListId,
});

export const setTaskIsDone = (
  taskListId: string,
  doneTaskId: string,
): SetTaskDoneActionType => ({
  type: TASKS_ACTIONS.SET_TASK_DONE,
  taskListId,
  doneTaskId,
});

export const setEditedTask = (
  taskListId: string,
  taskId: string,
  editedTaskTitle: string,
): EditTaskTitleActionType => ({
  type: TASKS_ACTIONS.EDIT_TASK_TITLE,
  taskListId,
  taskId,
  editedTaskTitle,
});

export const deleteTask = (
  taskListId: string,
  taskId: string,
): DeleteTaskActionType => ({
  type: TASKS_ACTIONS.DELETE_TASK,
  taskListId,
  taskId,
});
