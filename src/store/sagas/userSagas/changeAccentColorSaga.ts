import { ONLINE, START_ANIMATION_DELAY, USERS } from '@constants/constants';
import { DB } from '@root/api/DB';
import { checkInternetConnectionHelper } from '@root/helpers/checkInternetConnectionHelper';
import * as Sentry from '@sentry/react-native';
import { setAccentColorAction } from '@store/actions/userReducerActions/setAccentColorAction';
import { setModalErrorMessageAction } from '@store/actions/userReducerActions/setModalErrorMessageAction';
import { ChangeAccentColorSagaActionReturnType } from '@store/actions/userSagaActions/changeAccentColorAction';
import { UserIDType } from '@store/reducers/userReducer/types';
import { userIDSelector } from '@store/selectors/userSelectors';
import { call, cancel, delay, put, select } from 'redux-saga/effects';

export function* changeAccentColorSaga(action: ChangeAccentColorSagaActionReturnType) {
  const { accentColor, setIsLoading } = action.payload;

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
    const sendAccentColorToFirebase = () => {
      return DB.ref(`${USERS}/${userID}`).update({
        accentColor: accentColor,
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
      yield put(setModalErrorMessageAction({ errorModalMessage: error.message }));
    }
  } finally {
    yield call(setIsLoading, false);
  }
}
