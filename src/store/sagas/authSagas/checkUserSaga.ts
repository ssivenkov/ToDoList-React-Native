import {USERS} from '@constants/constants';
import {DB} from '@root/api/DB';
import {errorAlert} from '@root/helpers/alertHelper';
import {syncUserTaskListsAction} from '@store/actions/authSagaActions/syncUserTaskListsAction';
import {SnapshotType, UserIDType} from '@store/reducers/authReducer/types';
import {getUserID} from '@store/selectors/authSelectors';
import {put, select} from 'redux-saga/effects';

export function* checkUserSaga() {
  try {
    const userID: UserIDType = yield select(getUserID);
    const snapshot: SnapshotType = yield DB.ref(`${USERS}/${userID}`).once(
      'value',
    );
    const isUserExist = snapshot.exists();

    if (!isUserExist && userID) {
      DB.ref(`${USERS}/${userID}`).set({userToken: userID});
    } else {
      yield put(syncUserTaskListsAction());
    }
  } catch (error) {
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}
