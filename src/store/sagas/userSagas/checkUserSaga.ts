import {COLORS} from '@colors/colors';
import {EN, USERS} from '@constants/constants';
import {DB} from '@root/api/DB';
import {errorAlert} from '@root/helpers/alertHelper';
import {checkInternetConnectionHelper} from '@root/helpers/hasInternetConnectionHelper';
import {syncUserDataAction} from '@store/actions/userSagaActions/syncUserDataAction';
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
      DB.ref(`${USERS}/${userID}`).set({
        userToken: userID,
        language: EN,
        darkTheme: false,
        accentColor: COLORS.FLIRT,
      });
    } else {
      yield put(syncUserDataAction());
    }
  } catch (error) {
    errorAlert(error);
  }
}
