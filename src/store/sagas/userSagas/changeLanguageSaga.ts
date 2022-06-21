import { ONLINE, START_ANIMATION_DELAY, USERS } from '@constants/constants';
import { DB } from '@root/api/DB';
import { checkInternetConnectionHelper } from '@root/helpers/checkInternetConnectionHelper';
import { setLanguageAction } from '@store/actions/userReducerActions/setLanguageAction';
import { setModalErrorMessageAction } from '@store/actions/userReducerActions/setModalErrorMessageAction';
import { ChangeLanguageSagaActionReturnType } from '@store/actions/userSagaActions/changeLanguageAction';
import { UserIDType } from '@store/reducers/userReducer/types';
import { userIDSelector } from '@store/selectors/userSelectors';
import { changeLanguage as i18nextChangeLanguage } from 'i18next';
import { call, delay, put, select } from 'redux-saga/effects';

export function* changeLanguageSaga(action: ChangeLanguageSagaActionReturnType) {
  const { language, setIsLoading } = action.payload;

  try {
    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      throw Error(internetConnectionStatus);
    }

    if (setIsLoading) {
      yield call(setIsLoading, true);
    }
    yield delay(START_ANIMATION_DELAY);
    const userID: UserIDType = yield select(userIDSelector);
    const sendLanguageToFirebase = () => {
      return DB.ref(`${USERS}/${userID}`).update({
        language: language,
      });
    };

    yield call(sendLanguageToFirebase);

    const setAppLanguage = () => {
      return i18nextChangeLanguage(action.payload.language);
    };

    yield call(setAppLanguage);

    yield put(setLanguageAction({ language: language }));
    if (setIsLoading) {
      yield call(setIsLoading, false);
    }
  } catch (error) {
    if (setIsLoading) {
      yield call(setIsLoading, false);
    }

    if (error instanceof Error) {
      yield put(setModalErrorMessageAction({ errorModalMessage: error.message }));
    }
  }
}
