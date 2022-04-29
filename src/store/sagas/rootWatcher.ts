import {AUTH_SAGA_ACTIONS} from '@enums/authSagaEnum';
import {TASKS_SAGA_ACTIONS} from '@enums/tasksSagaEnum';
import {checkUserWorker} from '@store/sagas/authSagas/checkUserWorker';
import {createChannelWorker} from '@store/sagas/authSagas/createChannelWorker';
import {facebookSignInWorker} from '@store/sagas/authSagas/facebookSignInWorker';
import {googleSignInWorker} from '@store/sagas/authSagas/googleSignInWorker';
import {signOutWorker} from '@store/sagas/authSagas/signOutWorker';
import {syncUserTaskListsWorker} from '@store/sagas/authSagas/syncUserTaskListsWorker';
import {addNewTaskListWorker} from '@store/sagas/tasksSagas/taskListsSagas/addNewTaskListWorker';
import {deleteTaskListFromScreenWorker} from '@store/sagas/tasksSagas/taskListsSagas/deleteTaskListFromScreenWorker';
import {deleteTaskListFullWorker} from '@store/sagas/tasksSagas/taskListsSagas/deleteTaskListFullWorker';
import {editTaskListTitleWorker} from '@store/sagas/tasksSagas/taskListsSagas/editTaskListTitleWorker';
import {addNewTaskWorker} from '@store/sagas/tasksSagas/tasksSagas/addNewTaskWorker';
import {deleteTaskWorker} from '@store/sagas/tasksSagas/tasksSagas/deleteTaskWorker';
import {editTaskWorker} from '@store/sagas/tasksSagas/tasksSagas/editTaskWorker';
import {setTaskIsDoneWorker} from '@store/sagas/tasksSagas/tasksSagas/setTaskIsDoneWorker';
import {takeEvery, takeLatest} from 'redux-saga/effects';

export function* rootWatcher() {
  yield takeLatest(AUTH_SAGA_ACTIONS.GOOGLE_SIGN_IN_SAGA, googleSignInWorker);
  yield takeLatest(
    AUTH_SAGA_ACTIONS.FACEBOOK_SIGN_IN_SAGA,
    facebookSignInWorker,
  );
  yield takeLatest(AUTH_SAGA_ACTIONS.SIGN_OUT_SAGA, signOutWorker);
  yield takeLatest(AUTH_SAGA_ACTIONS.CREATE_CHANNEL_SAGA, createChannelWorker);
  yield takeEvery(AUTH_SAGA_ACTIONS.CHECK_USER, checkUserWorker);
  yield takeLatest(
    AUTH_SAGA_ACTIONS.SYNC_USER_TASK_LISTS,
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
  yield takeLatest(TASKS_SAGA_ACTIONS.SET_EDITED_TASK, editTaskWorker);
  yield takeLatest(TASKS_SAGA_ACTIONS.DELETE_TASK, deleteTaskWorker);
}
