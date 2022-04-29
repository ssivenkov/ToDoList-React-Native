import {Users} from '@constants/constants';
import {DB} from '@root/api/DB';
import {errorAlert} from '@root/helpers/alert';
import {syncUserTaskLists} from '@store/actions/authSagaActions/syncUserTaskLists';
import {SnapshotType, UserIDType} from '@store/reducers/authReducer/types';
import {getUserID} from '@store/selectors/authSelectors';
import {put, select} from 'redux-saga/effects';

export function* checkUserWorker() {
  try {
    const userID: UserIDType = yield select(getUserID);
    const snapshot: SnapshotType = yield DB.ref(`${Users}/${userID}`).once(
      'value',
    );
    const isUserExist = snapshot.exists();

    if (!isUserExist && userID) {
      DB.ref(`${Users}/${userID}`).set({userToken: userID});
    } else {
      yield put(syncUserTaskLists());
    }
  } catch (error) {
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}
