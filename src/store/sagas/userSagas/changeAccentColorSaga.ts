import { ONLINE, START_ANIMATION_DELAY } from '@constants/constants';
import { FIREBASE_PATH } from '@enums/firebaseEnum';
import { checkInternetConnectionHelper } from '@helpers/checkInternetConnectionHelper';
import { DB } from '@root/api/DB';
import * as Sentry from '@sentry/react-native';
import { setAccentColorAction } from '@store/actions/userReducerActions/setAccentColorAction';
import { setModalMessageAction } from '@store/actions/userReducerActions/setModalMessageAction';
import { ChangeAccentColorSagaActionReturnType } from '@store/actions/userSagaActions/changeAccentColorAction';
import { UserIDType } from '@store/reducers/userReducer/types';
import { userIDSelector } from '@store/selectors/userSelectors';
import { call, cancel, delay, put, select } from 'redux-saga/effects';

export function* changeAccentColorSaga(action: ChangeAccentColorSagaActionReturnType) {
  const { accentColor, setIsLoading } = action.payload;

  const { ACCENT_COLOR, USERS } = FIREBASE_PATH;

  try {
    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      yield put(setModalMessageAction({ modalMessage: internetConnectionStatus }));

      yield cancel();
    }

    yield call(setIsLoading, true);

    yield delay(START_ANIMATION_DELAY);

    const userID: UserIDType = yield select(userIDSelector);

    const sendAccentColorToFirebase = () => {
      return DB.ref(`${USERS}/${userID}`).update({
        [ACCENT_COLOR]: accentColor,
      });
    };

    yield call(sendAccentColorToFirebase);

    yield put(
      setAccentColorAction({
        accentColor,
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
