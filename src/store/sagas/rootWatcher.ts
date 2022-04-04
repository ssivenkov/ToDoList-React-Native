import {SIGN_IN_SAGA_ACTIONS} from '@enums/signInSagaActions';
import {
  googleUserDataWorker,
  googleSignOutWorker,
} from '@store/sagas/signInSaga';
import {takeEvery} from 'redux-saga/effects';

export function* rootWatcher() {
  yield takeEvery(
    SIGN_IN_SAGA_ACTIONS.GET_GOOGLE_USER_DATA_SAGA,
    googleUserDataWorker,
  );
  yield takeEvery(
    SIGN_IN_SAGA_ACTIONS.GOOGLE_SIGN_OUT_SAGA,
    googleSignOutWorker,
  );
}
