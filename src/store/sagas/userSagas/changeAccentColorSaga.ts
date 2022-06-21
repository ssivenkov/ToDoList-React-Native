import { ONLINE, START_ANIMATION_DELAY, USERS } from '@constants/constants';
import { DB } from '@root/api/DB';
import { checkInternetConnectionHelper } from '@root/helpers/checkInternetConnectionHelper';
import { setAccentColorAction } from '@store/actions/userReducerActions/setAccentColorAction';
import { setModalErrorMessageAction } from '@store/actions/userReducerActions/setModalErrorMessageAction';
import { ChangeAccentColorSagaActionReturnType } from '@store/actions/userSagaActions/changeAccentColorAction';
import { UserIDType } from '@store/reducers/userReducer/types';
import { userIDSelector } from '@store/selectors/userSelectors';
import { call, delay, put, select } from 'redux-saga/effects';

export function* changeAccentColorSaga(action: ChangeAccentColorSagaActionReturnType) {
  const { accentColor, setIsLoading } = action.payload;

  try {
    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      throw Error(internetConnectionStatus);
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
    yield call(setIsLoading, false);
  } catch (error) {
    yield call(setIsLoading, false);

    if (error instanceof Error) {
      yield put(setModalErrorMessageAction({ errorModalMessage: error.message }));
    }
  }
}
