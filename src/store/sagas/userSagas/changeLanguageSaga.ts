import { ONLINE, START_ANIMATION_DELAY } from '@constants/constants';
import { FIREBASE_PATH } from '@enums/firebaseEnum';
import { checkInternetConnectionHelper } from '@helpers/checkInternetConnectionHelper';
import { DB } from '@root/api/DB';
import * as Sentry from '@sentry/react-native';
import { setLanguageAction } from '@store/actions/userReducerActions/setLanguageAction';
import { setModalMessageAction } from '@store/actions/userReducerActions/setModalMessageAction';
import { ChangeLanguageSagaActionReturnType } from '@store/actions/userSagaActions/changeLanguageAction';
import { UserIDType } from '@store/reducers/userReducer/types';
import { userIDSelector } from '@store/selectors/userSelectors';
import { changeLanguage as i18nextChangeLanguage } from 'i18next';
import { call, cancel, delay, put, select } from 'redux-saga/effects';

export function* changeLanguageSaga(action: ChangeLanguageSagaActionReturnType) {
  const { language, setIsLoading } = action.payload;

  const { LANGUAGE, USERS } = FIREBASE_PATH;

  try {
    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      yield put(setModalMessageAction({ modalMessage: internetConnectionStatus }));

      yield cancel();
    }

    if (setIsLoading) {
      yield call(setIsLoading, true);
    }

    yield delay(START_ANIMATION_DELAY);

    const userID: UserIDType = yield select(userIDSelector);

    const sendLanguageToFirebase = () => {
      return DB.ref(`${USERS}/${userID}`).update({
        [LANGUAGE]: language,
      });
    };

    yield call(sendLanguageToFirebase);

    const setAppLanguage = () => {
      return i18nextChangeLanguage(action.payload.language);
    };

    yield call(setAppLanguage);

    yield put(setLanguageAction({ language: language }));
  } catch (error) {
    if (error instanceof Error) {
      yield call(Sentry.captureException, error);
      yield put(setModalMessageAction({ modalMessage: error.message }));
    }
  } finally {
    if (setIsLoading) {
      yield call(setIsLoading, false);
    }
  }
}
