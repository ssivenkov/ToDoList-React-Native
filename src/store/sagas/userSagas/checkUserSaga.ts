import { COLORS } from '@colors/colors';
import { ONLINE } from '@constants/constants';
import { EN } from '@constants/languages';
import { FIREBASE_PATH } from '@enums/firebaseEnum';
import { checkInternetConnectionHelper } from '@helpers/checkInternetConnectionHelper';
import { DB } from '@root/api/DB';
import * as Sentry from '@sentry/react-native';
import { setEmulatorStatusBarHeightAction } from '@store/actions/userReducerActions/setEmulatorStatusBarHeightAction';
import { setModalMessageAction } from '@store/actions/userReducerActions/setModalMessageAction';
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
import { isEmulator } from 'react-native-device-info';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { call, cancel, put, select } from 'redux-saga/effects';

export function* checkUserSaga() {
  const { USERS } = FIREBASE_PATH;

  try {
    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      yield put(setModalMessageAction({ modalMessage: internetConnectionStatus }));

      yield cancel();
    }

    const isDeviceEmulator: boolean = yield call(isEmulator);

    if (isDeviceEmulator && __DEV__) {
      const emulatorStatusBarHeight: number = yield call(getStatusBarHeight);

      yield put(setEmulatorStatusBarHeightAction({ emulatorStatusBarHeight }));
    }

    const userID: UserIDType = yield select(userIDSelector);
    const isUserDataSynchronized: UserReducerStateType['isUserDataSynchronized'] =
      yield select(isUserDataSynchronizedSelector);

    const snapshot: SnapshotType = yield DB.ref(`${USERS}/${userID}`).once('value');

    const isUserExist = snapshot.exists();

    if (!isUserExist && userID) {
      DB.ref(`${USERS}/${userID}`).set({
        accentColor: COLORS.ELECTRIC_VIOLET2,
        darkTheme: false,
        language: EN,
        userToken: userID,
      });
    } else {
      if (!isUserDataSynchronized) {
        yield put(syncUserDataAction());
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      yield call(Sentry.captureException, error);
      yield put(setModalMessageAction({ modalMessage: error.message }));
    }
  }
}
