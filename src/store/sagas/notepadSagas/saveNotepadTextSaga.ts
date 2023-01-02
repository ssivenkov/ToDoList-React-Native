import {
  NOTEPAD,
  NOTEPAD_TEXT,
  ONLINE,
  START_ANIMATION_DELAY,
  USERS,
} from '@constants/constants';
import { DB } from '@root/api/DB';
import { checkInternetConnectionHelper } from '@root/helpers/checkInternetConnectionHelper';
import * as Sentry from '@sentry/react-native';
import { setNotepadTextAction } from '@store/actions/notepadReducerActions/setNotepadTextAction';
import { SaveNotepadTextSagaActionReturnType } from '@store/actions/notepadSagaActions/saveNotepadTextAction';
import { setModalErrorMessageAction } from '@store/actions/userReducerActions/setModalErrorMessageAction';
import { UserIDType } from '@store/reducers/userReducer/types';
import { userIDSelector } from '@store/selectors/userSelectors';
import { t } from 'i18next';
import { call, cancel, delay, put, select } from 'redux-saga/effects';

export function* saveNotepadTextSaga(action: SaveNotepadTextSagaActionReturnType) {
  const { notepadText, setIsLoading, setButtonDisabled } = action.payload;

  try {
    yield call(setButtonDisabled, true);
    yield put(setNotepadTextAction({ notepadText }));

    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      yield put(
        setModalErrorMessageAction({
          errorModalMessage: t('notepadScreen.saveNotepadTextRequestError'),
        }),
      );

      yield cancel();
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

    yield put(
      setModalErrorMessageAction({
        errorModalMessage: t('notepadScreen.notepadSaved'),
      }),
    );
  } catch (error) {
    if (error instanceof Error) {
      yield call(Sentry.captureException, error);
      yield put(setModalErrorMessageAction({ errorModalMessage: error.message }));
    }
  } finally {
    yield call(setIsLoading, false);
    yield call(setButtonDisabled, false);
  }
}
