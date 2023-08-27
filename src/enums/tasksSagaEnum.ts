export enum TASKS_SAGA_ACTION {
  ADD_NEW_TASK = 'tasksSaga/ADD_NEW_TASK',
  ADD_NEW_TASK_LIST = 'tasksSaga/ADD_NEW_TASK_LIST',
  CLOSE_TASK_HORIZONTAL_MENU = 'tasksSaga/CLOSE_TASK_HORIZONTAL_MENU',
  DELETE_TASK = 'tasksSaga/DELETE_TASK',
  DELETE_TASK_LIST_FROM_SCREEN = 'tasksSaga/DELETE_TASK_LIST_FROM_SCREEN',
  DELETE_TASK_LIST_FULL = 'tasksSaga/DELETE_TASK_LIST_FULL',
  EDIT_TASK_LIST_SORTING = 'tasksSaga/EDIT_TASK_LIST_SORTING',
  EDIT_TASK_LIST_TITLE = 'tasksSaga/EDIT_TASK_LIST_TITLE',
  SET_EDITED_TASK = 'tasksSaga/SET_EDITED_TASK',
  SET_TASK_IS_DONE = 'tasksSaga/SET_TASK_IS_DONE',
  SET_TASK_IS_TODO = 'tasksSaga/SET_TASK_IS_TODO',
  WAIT_CLOSE_TASK_HORIZONTAL_MENU = 'tasksSaga/WAIT_CLOSE_TASK_HORIZONTAL_MENU',
}
