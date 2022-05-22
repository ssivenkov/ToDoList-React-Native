import {USERS} from '@constants/constants';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {DB} from '@root/api/DB';
import {errorAlert} from '@root/helpers/alertHelper';
import {hasInternetConnectionHelper} from '@root/helpers/hasInternetConnectionHelper';
import {syncUserTaskListsAction} from '@store/actions/authSagaActions/syncUserTaskListsAction';
import {SnapshotType, UserIDType} from '@store/reducers/authReducer/types';
import {userIDSelector} from '@store/selectors/authSelectors';
import {t} from 'i18next';
import {put, select} from 'redux-saga/effects';

export function* checkUserSaga() {
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();

    if (!hasInternetConnectionHelper(connectionStatus)) {
      errorAlert(t('common.NoInternetConnection'));

      return;
    }

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
