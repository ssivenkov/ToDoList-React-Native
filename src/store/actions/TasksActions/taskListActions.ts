import {TASK_LIST_ACTIONS} from '../../../enums/TasksEnum';
import {
  AddNewTaskListActionType,
  DeleteTaskListActionType,
  EditTaskListTitleActionType,
  SetTaskListsActionType,
} from 'store/actions/TasksActions/Types';
import {TaskListType} from '../../reducers/taskListReducer/Types';

export const setTaskLists = (
  taskLists: TaskListType[],
): SetTaskListsActionType => ({
  type: TASK_LIST_ACTIONS.SET_TASK_LISTS,
  taskLists,
});

export const addNewTaskList = (
  newTaskList: TaskListType,
): AddNewTaskListActionType => ({
  type: TASK_LIST_ACTIONS.ADD_NEW_TASK_LIST,
  newTaskList,
});

export const deleteTaskList = (
  taskListId: string,
): DeleteTaskListActionType => ({
  type: TASK_LIST_ACTIONS.DELETE_TASK_LIST,
  taskListId,
});

export const setEditedTaskList = (
  editedTaskList: TaskListType,
): EditTaskListTitleActionType => ({
  type: TASK_LIST_ACTIONS.EDIT_TASK_LIST_TITLE,
  editedTaskList,
});
