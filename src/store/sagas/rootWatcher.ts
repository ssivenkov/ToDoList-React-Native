import { NOTEPAD_SAGA_ACTION } from '@enums/notepadSagaEnum';
import { TASKS_SAGA_ACTION } from '@enums/tasksSagaEnum';
import { USER_SAGA_ACTION } from '@enums/userSagaEnum';
import { cleanNotepadTextSaga } from '@store/sagas/notepadSagas/cleanNotepadTextSaga';
import { saveNotepadTextSaga } from '@store/sagas/notepadSagas/saveNotepadTextSaga';
import { addNewTaskListSaga } from '@store/sagas/tasksSagas/taskListsSagas/addNewTaskListSaga';
import { deleteTaskListFromScreenSaga } from '@store/sagas/tasksSagas/taskListsSagas/deleteTaskListFromScreenSaga';
import { deleteTaskListFullSaga } from '@store/sagas/tasksSagas/taskListsSagas/deleteTaskListFullSaga';
import { editTaskListTitleSaga } from '@store/sagas/tasksSagas/taskListsSagas/editTaskListTitleSaga';
import { addNewTaskSaga } from '@store/sagas/tasksSagas/tasksSagas/addNewTaskSaga';
import { deleteTaskSaga } from '@store/sagas/tasksSagas/tasksSagas/deleteTaskSaga';
import { editTaskSaga } from '@store/sagas/tasksSagas/tasksSagas/editTaskSaga';
import { setTaskIsDoneSaga } from '@store/sagas/tasksSagas/tasksSagas/setTaskIsDoneSaga';
import { waitCloseTaskHorizontalMenuSaga } from '@store/sagas/tasksSagas/tasksSagas/waitCloseTaskHorizontalMenuSaga';
import { changeAccentColorSaga } from '@store/sagas/userSagas/changeAccentColorSaga';
import { changeDarkModeSaga } from '@store/sagas/userSagas/changeDarkModeSaga';
import { changeLanguageSaga } from '@store/sagas/userSagas/changeLanguageSaga';
import { checkUserSaga } from '@store/sagas/userSagas/checkUserSaga';
import { contactTheAuthorSaga } from '@store/sagas/userSagas/contactTheAuthorSaga';
import { createChannelSaga } from '@store/sagas/userSagas/createChannelSaga';
import { deleteAccountSaga } from '@store/sagas/userSagas/deleteAccountSaga';
import { facebookSignInSaga } from '@store/sagas/userSagas/facebookSignInSaga';
import { getUserDataSaga } from '@store/sagas/userSagas/getUserDataSaga';
import { googleSignInSaga } from '@store/sagas/userSagas/googleSignInSaga';
import { goToGooglePlaySaga } from '@store/sagas/userSagas/goToGooglePlaySaga';
import { signOutSaga } from '@store/sagas/userSagas/signOutSaga';
import { syncUserDataSaga } from '@store/sagas/userSagas/syncUserDataSaga';
import { takeEvery, takeLatest } from 'redux-saga/effects';

export function* rootWatcher() {
  yield takeLatest(USER_SAGA_ACTION.CHANGE_LANGUAGE, changeLanguageSaga);
  yield takeLatest(USER_SAGA_ACTION.CHANGE_ACCENT_COLOR, changeAccentColorSaga);
  yield takeLatest(USER_SAGA_ACTION.CHANGE_DARK_MODE, changeDarkModeSaga);
  yield takeLatest(USER_SAGA_ACTION.GOOGLE_SIGN_IN, googleSignInSaga);
  yield takeLatest(USER_SAGA_ACTION.FACEBOOK_SIGN_IN, facebookSignInSaga);
  yield takeLatest(USER_SAGA_ACTION.GET_USER_DATA, getUserDataSaga);
  yield takeLatest(USER_SAGA_ACTION.SIGN_OUT, signOutSaga);
  yield takeLatest(USER_SAGA_ACTION.DELETE_ACCOUNT, deleteAccountSaga);
  yield takeLatest(USER_SAGA_ACTION.CREATE_CHANNEL, createChannelSaga);
  yield takeEvery(USER_SAGA_ACTION.CHECK_USER, checkUserSaga);
  yield takeLatest(USER_SAGA_ACTION.SYNC_USER_DATA, syncUserDataSaga);
  yield takeLatest(USER_SAGA_ACTION.CONTACT_THE_AUTHOR, contactTheAuthorSaga);
  yield takeLatest(USER_SAGA_ACTION.GO_TO_GOOGLE_PLAY, goToGooglePlaySaga);

  yield takeLatest(TASKS_SAGA_ACTION.ADD_NEW_TASK_LIST, addNewTaskListSaga);
  yield takeLatest(TASKS_SAGA_ACTION.ADD_NEW_TASK, addNewTaskSaga);
  yield takeLatest(TASKS_SAGA_ACTION.EDIT_TASK_LIST_TITLE, editTaskListTitleSaga);
  yield takeLatest(TASKS_SAGA_ACTION.DELETE_TASK_LIST_FULL, deleteTaskListFullSaga);
  yield takeLatest(
    TASKS_SAGA_ACTION.DELETE_TASK_LIST_FROM_SCREEN,
    deleteTaskListFromScreenSaga,
  );
  yield takeLatest(TASKS_SAGA_ACTION.SET_TASK_IS_DONE, setTaskIsDoneSaga);
  yield takeLatest(TASKS_SAGA_ACTION.SET_EDITED_TASK, editTaskSaga);
  yield takeLatest(
    TASKS_SAGA_ACTION.WAIT_CLOSE_TASK_HORIZONTAL_MENU,
    waitCloseTaskHorizontalMenuSaga,
  );
  yield takeLatest(TASKS_SAGA_ACTION.DELETE_TASK, deleteTaskSaga);

  yield takeLatest(NOTEPAD_SAGA_ACTION.SAVE_NOTEPAD_TEXT, saveNotepadTextSaga);
  yield takeLatest(NOTEPAD_SAGA_ACTION.CLEAN_NOTEPAD_TEXT, cleanNotepadTextSaga);
}
