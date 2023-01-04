import { ONLINE, START_ANIMATION_DELAY } from '@constants/constants';
import { FIREBASE_PATH } from '@enums/firebaseEnum';
import { checkInternetConnectionHelper } from '@helpers/checkInternetConnectionHelper';
import { DB } from '@root/api/DB';
import * as Sentry from '@sentry/react-native';
import { setNotepadTextAction } from '@store/actions/notepadReducerActions/setNotepadTextAction';
import { SaveNotepadTextSagaActionReturnType } from '@store/actions/notepadSagaActions/saveNotepadTextAction';
import { setModalMessageAction } from '@store/actions/userReducerActions/setModalMessageAction';
import { UserIDType } from '@store/reducers/userReducer/types';
import { userIDSelector } from '@store/selectors/userSelectors';
import { t } from 'i18next';
import { call, cancel, delay, put, select } from 'redux-saga/effects';

export function* saveNotepadTextSaga(action: SaveNotepadTextSagaActionReturnType) {
  const { notepadText, setIsLoading, setButtonDisabled } = action.payload;

  const { NOTEPAD, NOTEPAD_TEXT, USERS } = FIREBASE_PATH;

  try {
    yield call(setButtonDisabled, true);

    yield put(setNotepadTextAction({ notepadText }));

    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      yield put(
        setModalMessageAction({
          modalMessage: t('notepadScreen.SaveNotepadTextRequestError'),
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
      setModalMessageAction({
        modalMessage: t('notepadScreen.NotepadSaved'),
      }),
    );
  } catch (error) {
    if (error instanceof Error) {
      yield call(Sentry.captureException, error);
      yield put(setModalMessageAction({ modalMessage: error.message }));
    }
  } finally {
    yield call(setIsLoading, false);
    yield call(setButtonDisabled, false);
  }
}
