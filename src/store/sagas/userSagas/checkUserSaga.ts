import { COLORS } from '@colors/colors';
import { EN, ONLINE, USERS } from '@constants/constants';
import { DB } from '@root/api/DB';
import { checkInternetConnectionHelper } from '@root/helpers/checkInternetConnectionHelper';
import { setModalErrorMessageAction } from '@store/actions/userReducerActions/setModalErrorMessageAction';
import { syncUserDataAction } from '@store/actions/userSagaActions/syncUserDataAction';
import {
  SnapshotType,
  UserIDType,
  UserReducerStateType,
} from '@store/reducers/userReducer/types';
import {
  isUserDataSynchronizedSelector,
  userIDSelector,
} from '@store/selectors/userSelectors';
import { call, put, select } from 'redux-saga/effects';

export function* checkUserSaga() {
  try {
    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      throw Error(internetConnectionStatus);
    }

    const userID: UserIDType = yield select(userIDSelector);
    const isUserDataSynchronized: UserReducerStateType['isUserDataSynchronized'] =
      yield select(isUserDataSynchronizedSelector);

    const snapshot: SnapshotType = yield DB.ref(`${USERS}/${userID}`).once('value');
    const isUserExist = snapshot.exists();

    if (!isUserExist && userID) {
      DB.ref(`${USERS}/${userID}`).set({
        userToken: userID,
        language: EN,
        darkTheme: false,
        accentColor: COLORS.FLIRT,
      });
    } else {
      if (!isUserDataSynchronized) {
        yield put(syncUserDataAction());
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(setModalErrorMessageAction({ errorModalMessage: error.message }));
    }
  }
}
