import {errorAlert} from '@root/helpers/alertHelper';
import {setLanguageAction} from '@store/actions/userReducerActions/setLanguageAction';
import {ChangeLanguageSagaActionReturnType} from '@store/actions/userSagaActions/changeLanguageAction';
import i18next from 'i18next';
import {put} from 'redux-saga/effects';

export function* changeLanguageSaga(
  action: ChangeLanguageSagaActionReturnType,
) {
  try {
    yield i18next.changeLanguage(action.payload.language);
    yield put(setLanguageAction({language: action.payload.language}));
  } catch (error) {
    errorAlert(error);
  }
}
