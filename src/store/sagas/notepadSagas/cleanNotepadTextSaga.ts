import {
  NOTEPAD,
  NOTEPAD_TEXT,
  ONLINE,
  START_ANIMATION_DELAY,
  USERS,
} from '@constants/constants';
import { DB } from '@root/api/DB';
import { checkInternetConnectionHelper } from '@root/helpers/checkInternetConnectionHelper';
import { setNotepadTextAction } from '@store/actions/notepadReducerActions/setNotepadTextAction';
import { CleanNotepadTextSagaActionReturnType } from '@store/actions/notepadSagaActions/cleanNotepadTextAction';
import { setModalErrorMessageAction } from '@store/actions/userReducerActions/setModalErrorMessageAction';
import { UserIDType } from '@store/reducers/userReducer/types';
import { userIDSelector } from '@store/selectors/userSelectors';
import { t } from 'i18next';
import { call, delay, put, select } from 'redux-saga/effects';

export function* cleanNotepadTextSaga(action: CleanNotepadTextSagaActionReturnType) {
  const { setNotepadText, setIsLoading, setModalVisible, setButtonDisabled } =
    action.payload;

  try {
    yield call(setButtonDisabled, true);

    yield put(setNotepadTextAction({ notepadText: '' }));

    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      yield call(setNotepadText, '');
      yield call(setModalVisible, false);
      yield call(setButtonDisabled, false);

      throw Error(t('notepadScreen.cleanNotepadTextRequestError'));
    }

    yield call(setIsLoading, true);
    yield delay(START_ANIMATION_DELAY);
    const userID: UserIDType = yield select(userIDSelector);

    const cleanNotepadTextInFirebase = () => {
      return DB.ref(`${USERS}/${userID}/${NOTEPAD}/${NOTEPAD_TEXT}`).remove();
    };

    yield call(cleanNotepadTextInFirebase);
    yield call(setIsLoading, false);
    yield call(setNotepadText, '');
    yield call(setModalVisible, false);
    yield put(
      setModalErrorMessageAction({
        errorModalMessage: t('notepadScreen.notepadCleared'),
      }),
    );
    yield call(setButtonDisabled, false);
  } catch (error) {
    yield call(setIsLoading, false);

    if (error instanceof Error) {
      yield put(setModalErrorMessageAction({ errorModalMessage: error.message }));
    }
  }
}
