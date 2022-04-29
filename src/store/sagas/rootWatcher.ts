import {AUTH_SAGA_ACTIONS} from '@enums/authSagaEnum';
import {TASKS_SAGA_ACTIONS} from '@enums/tasksSagaEnum';
import {checkUserSaga} from '@store/sagas/authSagas/checkUserSaga';
import {createChannelSaga} from '@store/sagas/authSagas/createChannelSaga';
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
  yield takeLatest(AUTH_SAGA_ACTIONS.GOOGLE_SIGN_IN_SAGA, googleSignInSaga);
  yield takeLatest(AUTH_SAGA_ACTIONS.FACEBOOK_SIGN_IN_SAGA, facebookSignInSaga);
  yield takeLatest(AUTH_SAGA_ACTIONS.SIGN_OUT_SAGA, signOutSaga);
  yield takeLatest(AUTH_SAGA_ACTIONS.CREATE_CHANNEL_SAGA, createChannelSaga);
  yield takeEvery(AUTH_SAGA_ACTIONS.CHECK_USER, checkUserSaga);
  yield takeLatest(
    AUTH_SAGA_ACTIONS.SYNC_USER_TASK_LISTS,
    syncUserTaskListsSaga,
  );

  yield takeLatest(TASKS_SAGA_ACTIONS.ADD_NEW_TASK_LIST, addNewTaskListSaga);
  yield takeLatest(TASKS_SAGA_ACTIONS.ADD_NEW_TASK, addNewTaskSaga);
  yield takeLatest(
    TASKS_SAGA_ACTIONS.EDIT_TASK_LIST_TITLE,
    editTaskListTitleSaga,
  );
  yield takeLatest(
    TASKS_SAGA_ACTIONS.DELETE_TASK_LIST_FULL,
    deleteTaskListFullSaga,
  );
  yield takeLatest(
    TASKS_SAGA_ACTIONS.DELETE_TASK_LIST_FROM_SCREEN,
    deleteTaskListFromScreenSaga,
  );
  yield takeLatest(TASKS_SAGA_ACTIONS.SET_TASK_IS_DONE, setTaskIsDoneSaga);
  yield takeLatest(TASKS_SAGA_ACTIONS.SET_EDITED_TASK, editTaskSaga);
  yield takeLatest(TASKS_SAGA_ACTIONS.DELETE_TASK, deleteTaskSaga);
}
