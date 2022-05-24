import {AUTH_SAGA_ACTION} from '@enums/authSagaEnum';
import {TASKS_SAGA_ACTION} from '@enums/tasksSagaEnum';
import {changeLanguageSaga} from '@store/sagas/authSagas/changeLanguageSaga';
import {checkUserSaga} from '@store/sagas/authSagas/checkUserSaga';
import {createChannelSaga} from '@store/sagas/authSagas/createChannelSaga';
import {deleteAccountSaga} from '@store/sagas/authSagas/deleteAccountSaga';
import {facebookSignInSaga} from '@store/sagas/authSagas/facebookSignInSaga';
import {googleSignInSaga} from '@store/sagas/authSagas/googleSignInSaga';
import {signOutSaga} from '@store/sagas/authSagas/signOutSaga';
import {syncUserTaskListsSaga} from '@store/sagas/authSagas/syncUserTaskListsSaga';
import {addNewTaskListSaga} from '@store/sagas/tasksSagas/taskListsSagas/addNewTaskListSaga';
import {deleteTaskListFromScreenSaga} from '@store/sagas/tasksSagas/taskListsSagas/deleteTaskListFromScreenSaga';
import {deleteTaskListFullSaga} from '@store/sagas/tasksSagas/taskListsSagas/deleteTaskListFullSaga';
import {editTaskListTitleSaga} from '@store/sagas/tasksSagas/taskListsSagas/editTaskListTitleSaga';
import {addNewTaskSaga} from '@store/sagas/tasksSagas/tasksSagas/addNewTaskSaga';
import {deleteTaskSaga} from '@store/sagas/tasksSagas/tasksSagas/deleteTaskSaga';
import {editTaskSaga} from '@store/sagas/tasksSagas/tasksSagas/editTaskSaga';
import {setTaskIsDoneSaga} from '@store/sagas/tasksSagas/tasksSagas/setTaskIsDoneSaga';
import {takeEvery, takeLatest} from 'redux-saga/effects';

export function* rootWatcher() {
  yield takeLatest(AUTH_SAGA_ACTION.CHANGE_LANGUAGE, changeLanguageSaga);
  yield takeLatest(AUTH_SAGA_ACTION.GOOGLE_SIGN_IN, googleSignInSaga);
  yield takeLatest(AUTH_SAGA_ACTION.FACEBOOK_SIGN_IN, facebookSignInSaga);
  yield takeLatest(AUTH_SAGA_ACTION.SIGN_OUT, signOutSaga);
  yield takeLatest(AUTH_SAGA_ACTION.DELETE_ACCOUNT, deleteAccountSaga);
  yield takeLatest(AUTH_SAGA_ACTION.CREATE_CHANNEL, createChannelSaga);
  yield takeEvery(AUTH_SAGA_ACTION.CHECK_USER, checkUserSaga);
  yield takeLatest(
    AUTH_SAGA_ACTION.SYNC_USER_TASK_LISTS,
    syncUserTaskListsSaga,
  );

  yield takeLatest(TASKS_SAGA_ACTION.ADD_NEW_TASK_LIST, addNewTaskListSaga);
  yield takeLatest(TASKS_SAGA_ACTION.ADD_NEW_TASK, addNewTaskSaga);
  yield takeLatest(
    TASKS_SAGA_ACTION.EDIT_TASK_LIST_TITLE,
    editTaskListTitleSaga,
  );
  yield takeLatest(
    TASKS_SAGA_ACTION.DELETE_TASK_LIST_FULL,
    deleteTaskListFullSaga,
  );
  yield takeLatest(
    TASKS_SAGA_ACTION.DELETE_TASK_LIST_FROM_SCREEN,
    deleteTaskListFromScreenSaga,
  );
  yield takeLatest(TASKS_SAGA_ACTION.SET_TASK_IS_DONE, setTaskIsDoneSaga);
  yield takeLatest(TASKS_SAGA_ACTION.SET_EDITED_TASK, editTaskSaga);
  yield takeLatest(TASKS_SAGA_ACTION.DELETE_TASK, deleteTaskSaga);
}
