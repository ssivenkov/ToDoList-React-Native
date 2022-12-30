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
import { SaveNotepadTextSagaActionReturnType } from '@store/actions/notepadSagaActions/saveNotepadTextAction';
import { setModalErrorMessageAction } from '@store/actions/userReducerActions/setModalErrorMessageAction';
import { UserIDType } from '@store/reducers/userReducer/types';
import { userIDSelector } from '@store/selectors/userSelectors';
import { t } from 'i18next';
import { call, delay, put, select } from 'redux-saga/effects';

export function* saveNotepadTextSaga(action: SaveNotepadTextSagaActionReturnType) {
  const { notepadText, setIsLoading, setButtonDisabled } = action.payload;

  try {
    yield call(setButtonDisabled, true);
    yield put(setNotepadTextAction({ notepadText }));

    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      yield call(setButtonDisabled, false);

      throw Error(t('notepadScreen.saveNotepadTextRequestError'));
    }

    yield call(setIsLoading, true);
    yield delay(START_ANIMATION_DELAY);
    const userID: UserIDType = yield select(userIDSelector);

    const sendNotepadTextToFirebase = () => {
      return DB.ref(`${USERS}/${userID}/${NOTEPAD}`).update({
        [NOTEPAD_TEXT]: notepadText,
      });
    };

    yield call(sendNotepadTextToFirebase);
    yield call(setIsLoading, false);
    yield put(
      setModalErrorMessageAction({
        errorModalMessage: t('notepadScreen.notepadSaved'),
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
