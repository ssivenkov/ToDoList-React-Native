import { ONLINE, START_ANIMATION_DELAY } from '@constants/constants';
import { FIREBASE_PATH } from '@enums/firebaseEnum';
import { checkInternetConnectionHelper } from '@helpers/checkInternetConnectionHelper';
import { DB } from '@root/api/DB';
import * as Sentry from '@sentry/react-native';
import { setModalMessageAction } from '@store/actions/userReducerActions/setModalMessageAction';
import { setThemeAction } from '@store/actions/userReducerActions/setThemeAction';
import { ChangeDarkModeSagaActionReturnType } from '@store/actions/userSagaActions/changeDarkModeAction';
import { UserIDType } from '@store/reducers/userReducer/types';
import { userIDSelector } from '@store/selectors/userSelectors';
import { call, cancel, delay, put, select } from 'redux-saga/effects';

export function* changeDarkModeSaga(action: ChangeDarkModeSagaActionReturnType) {
  const { darkMode, setIsLoading, theme } = action.payload;

  const { DARK_MODE, USERS } = FIREBASE_PATH;

  try {
    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      yield put(setModalMessageAction({ modalMessage: internetConnectionStatus }));

      yield cancel();
    }

    yield call(setIsLoading, true);

    yield delay(START_ANIMATION_DELAY);

    const userID: UserIDType = yield select(userIDSelector);

    const sendDarkModeToFirebase = () => {
      return DB.ref(`${USERS}/${userID}`).update({
        [DARK_MODE]: darkMode,
      });
    };

    yield call(sendDarkModeToFirebase);

    yield put(
      setThemeAction({
        theme,
      }),
    );
  } catch (error) {
    if (error instanceof Error) {
      yield call(Sentry.captureException, error);
      yield put(setModalMessageAction({ modalMessage: error.message }));
    }
  } finally {
    yield call(setIsLoading, false);
  }
}
