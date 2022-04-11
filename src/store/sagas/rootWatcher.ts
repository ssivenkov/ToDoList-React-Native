import {AUTH_SAGA_ACTIONS} from '@enums/authSagaEnum';
import {TASKS_SAGA_ACTIONS} from '@enums/tasksSagaEnum';
import {
  googleSignInWorker,
  signOutWorker,
  facebookSignInWorker,
} from '@store/sagas/authSaga';
import {
  addNewTaskListWorker,
  addNewTaskWorker,
  checkUserWorker,
  deleteTaskListFromScreenWorker,
  deleteTaskListFullWorker,
  deleteTaskWorker,
  editTaskListTitleWorker,
  editTaskTitleWorker,
  setTaskIsDoneWorker,
  syncUserTaskListsWorker,
} from '@store/sagas/tasksSaga';
import {takeLatest} from 'redux-saga/effects';

export function* rootWatcher() {
  yield takeLatest(AUTH_SAGA_ACTIONS.GOOGLE_SIGN_IN_SAGA, googleSignInWorker);
  yield takeLatest(
    AUTH_SAGA_ACTIONS.FACEBOOK_SIGN_IN_SAGA,
    facebookSignInWorker,
  );
  yield takeLatest(AUTH_SAGA_ACTIONS.SIGN_OUT_SAGA, signOutWorker);
  yield takeLatest(TASKS_SAGA_ACTIONS.CHECK_USER, checkUserWorker);
  yield takeLatest(
    TASKS_SAGA_ACTIONS.SYNC_USER_TASK_LISTS,
    syncUserTaskListsWorker,
  );
  yield takeLatest(TASKS_SAGA_ACTIONS.ADD_NEW_TASK_LIST, addNewTaskListWorker);
  yield takeLatest(TASKS_SAGA_ACTIONS.ADD_NEW_TASK, addNewTaskWorker);
  yield takeLatest(
    TASKS_SAGA_ACTIONS.EDIT_TASK_LIST_TITLE,
    editTaskListTitleWorker,
  );
  yield takeLatest(
    TASKS_SAGA_ACTIONS.DELETE_TASK_LIST_FULL,
    deleteTaskListFullWorker,
  );
  yield takeLatest(
    TASKS_SAGA_ACTIONS.DELETE_TASK_LIST_FROM_SCREEN,
    deleteTaskListFromScreenWorker,
  );
  yield takeLatest(TASKS_SAGA_ACTIONS.SET_TASK_IS_DONE, setTaskIsDoneWorker);
  yield takeLatest(TASKS_SAGA_ACTIONS.SET_EDITED_TASK, editTaskTitleWorker);
  yield takeLatest(TASKS_SAGA_ACTIONS.DELETE_TASK, deleteTaskWorker);
}
