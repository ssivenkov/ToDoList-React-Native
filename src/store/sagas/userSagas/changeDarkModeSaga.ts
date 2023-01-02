import { ONLINE, START_ANIMATION_DELAY, USERS } from '@constants/constants';
import { DB } from '@root/api/DB';
import { checkInternetConnectionHelper } from '@root/helpers/checkInternetConnectionHelper';
import * as Sentry from '@sentry/react-native';
import { setModalErrorMessageAction } from '@store/actions/userReducerActions/setModalErrorMessageAction';
import { setThemeAction } from '@store/actions/userReducerActions/setThemeAction';
import { ChangeDarkModeSagaActionReturnType } from '@store/actions/userSagaActions/changeDarkModeAction';
import { UserIDType } from '@store/reducers/userReducer/types';
import { userIDSelector } from '@store/selectors/userSelectors';
import { call, cancel, delay, put, select } from 'redux-saga/effects';

export function* changeDarkModeSaga(action: ChangeDarkModeSagaActionReturnType) {
  const { darkMode, setIsLoading, theme } = action.payload;

  try {
    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      yield put(
        setModalErrorMessageAction({ errorModalMessage: internetConnectionStatus }),
      );

      yield cancel();
    }

    yield call(setIsLoading, true);
    yield delay(START_ANIMATION_DELAY);
    const userID: UserIDType = yield select(userIDSelector);
    const sendDarkModeToFirebase = () => {
      return DB.ref(`${USERS}/${userID}`).update({
        darkMode: darkMode,
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
      yield put(setModalErrorMessageAction({ errorModalMessage: error.message }));
    }
  } finally {
    yield call(setIsLoading, false);
  }
}
