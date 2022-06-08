import {START_ANIMATION_DELAY, USERS} from '@constants/constants';
import {DB} from '@root/api/DB';
import {errorAlert} from '@root/helpers/alertHelper';
import {checkInternetConnectionHelper} from '@root/helpers/hasInternetConnectionHelper';
import {setLanguageAction} from '@store/actions/userReducerActions/setLanguageAction';
import {ChangeLanguageSagaActionReturnType} from '@store/actions/userSagaActions/changeLanguageAction';
import {UserIDType} from '@store/reducers/userReducer/types';
import {userIDSelector} from '@store/selectors/userSelectors';
import i18next from 'i18next';
import {call, delay, put, select} from 'redux-saga/effects';

export function* changeLanguageSaga(
  action: ChangeLanguageSagaActionReturnType,
) {
  const {language, setIsLoading} = action.payload;
  try {
    const internetIsOn: boolean = yield call(checkInternetConnectionHelper);
    if (!internetIsOn) return;

    if (setIsLoading) yield call(setIsLoading, true);
    yield delay(START_ANIMATION_DELAY);
    const userID: UserIDType = yield select(userIDSelector);
    const sendLanguageToFirebase = () => {
      return DB.ref(`${USERS}/${userID}`).update({
        language: language,
      });
    };

    yield call(sendLanguageToFirebase);

    const setAppLanguage = () => {
      return i18next.changeLanguage(action.payload.language);
    };
    yield call(setAppLanguage);

    yield put(setLanguageAction({language: language}));
    if (setIsLoading) yield call(setIsLoading, false);
  } catch (error) {
    if (setIsLoading) yield call(setIsLoading, false);
    errorAlert(error);
  }
}
