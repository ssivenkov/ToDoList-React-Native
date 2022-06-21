import { ONLINE, START_ANIMATION_DELAY, USERS } from '@constants/constants';
import { DB } from '@root/api/DB';
import { checkInternetConnectionHelper } from '@root/helpers/checkInternetConnectionHelper';
import { setModalErrorMessageAction } from '@store/actions/userReducerActions/setModalErrorMessageAction';
import { setThemeAction } from '@store/actions/userReducerActions/setThemeAction';
import { ChangeDarkModeSagaActionReturnType } from '@store/actions/userSagaActions/changeDarkModeAction';
import { UserIDType } from '@store/reducers/userReducer/types';
import { userIDSelector } from '@store/selectors/userSelectors';
import { call, delay, put, select } from 'redux-saga/effects';

export function* changeDarkModeSaga(action: ChangeDarkModeSagaActionReturnType) {
  const { darkMode, setIsLoading, theme } = action.payload;

  try {
    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      throw Error(internetConnectionStatus);
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
    yield call(setIsLoading, false);
  } catch (error) {
    yield call(setIsLoading, false);

    if (error instanceof Error) {
      yield put(setModalErrorMessageAction({ errorModalMessage: error.message }));
    }
  }
}
