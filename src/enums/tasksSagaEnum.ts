export enum TASKS_SAGA_ACTIONS {
  CHECK_USER = 'tasksSaga/CHECK_USER',
  SYNC_USER_TASK_LISTS = 'tasksSaga/SYNC_USER_TASK_LISTS',
  ADD_NEW_TASK_LIST = 'tasksSaga/ADD_NEW_TASK_LIST',
  ADD_NEW_TASK = 'tasksSaga/ADD_NEW_TASK',
  EDIT_TASK_LIST_TITLE = 'tasksSaga/EDIT_TASK_LIST_TITLE',
  DELETE_TASK_LIST_FULL = 'tasksSaga/DELETE_TASK_LIST_FULL',
  DELETE_TASK_LIST_FROM_SCREEN = 'tasksSaga/DELETE_TASK_LIST_FROM_SCREEN',
  SET_TASK_IS_DONE = 'tasksSaga/SET_TASK_IS_DONE',
  SET_EDITED_TASK = 'tasksSaga/SET_EDITED_TASK',
  DELETE_TASK = 'tasksSaga/DELETE_TASK',
}
