import {USERS} from '@constants/constants';
import {DB} from '@root/api/DB';
import {errorAlert} from '@root/helpers/alertHelper';
import {checkInternetConnectionHelper} from '@root/helpers/hasInternetConnectionHelper';
import {syncUserTaskListsAction} from '@store/actions/userSagaActions/syncUserTaskListsAction';
import {SnapshotType, UserIDType} from '@store/reducers/userReducer/types';
import {userIDSelector} from '@store/selectors/userSelectors';
import {call, put, select} from 'redux-saga/effects';

export function* checkUserSaga() {
  try {
    const internetIsOn: boolean = yield call(checkInternetConnectionHelper);
    if (!internetIsOn) return;

    const userID: UserIDType = yield select(userIDSelector);
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
    errorAlert(error);
  }
}
