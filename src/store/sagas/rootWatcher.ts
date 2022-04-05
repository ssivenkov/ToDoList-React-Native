import {SIGN_IN_SAGA_ACTIONS} from '@enums/signInSagaEnum';
import {
  googleUserDataWorker,
  googleSignOutWorker,
  facebookSignOutWorker,
  facebookUserDataWorker,
} from '@store/sagas/signInSaga';
import {takeLatest} from 'redux-saga/effects';

export function* rootWatcher() {
  yield takeLatest(
    SIGN_IN_SAGA_ACTIONS.GET_GOOGLE_USER_DATA_SAGA,
    googleUserDataWorker,
  );
  yield takeLatest(
    SIGN_IN_SAGA_ACTIONS.GOOGLE_SIGN_OUT_SAGA,
    googleSignOutWorker,
  );
  yield takeLatest(
    SIGN_IN_SAGA_ACTIONS.GET_FACEBOOK_USER_DATA_SAGA,
    facebookUserDataWorker,
  );
  yield takeLatest(
    SIGN_IN_SAGA_ACTIONS.FACEBOOK_SIGN_OUT_SAGA,
    facebookSignOutWorker,
  );
}
