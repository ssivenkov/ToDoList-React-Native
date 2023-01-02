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
import { CleanNotepadTextSagaActionReturnType } from '@store/actions/notepadSagaActions/cleanNotepadTextAction';
import { setModalErrorMessageAction } from '@store/actions/userReducerActions/setModalErrorMessageAction';
import { UserIDType } from '@store/reducers/userReducer/types';
import { userIDSelector } from '@store/selectors/userSelectors';
import { t } from 'i18next';
import { call, cancel, delay, put, select } from 'redux-saga/effects';

export function* cleanNotepadTextSaga(action: CleanNotepadTextSagaActionReturnType) {
  const { setNotepadText, setIsLoading, setModalVisible, setButtonDisabled } =
    action.payload;

  try {
    yield call(setButtonDisabled, true);

    yield put(setNotepadTextAction({ notepadText: '' }));

    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      yield put(
        setModalErrorMessageAction({
          errorModalMessage: t('notepadScreen.cleanNotepadTextRequestError'),
        }),
      );

      yield cancel();
    }

    yield call(setIsLoading, true);
    yield delay(START_ANIMATION_DELAY);
    const userID: UserIDType = yield select(userIDSelector);

    const cleanNotepadTextInFirebase = () => {
      return DB.ref(`${USERS}/${userID}/${NOTEPAD}/${NOTEPAD_TEXT}`).remove();
    };

    yield call(cleanNotepadTextInFirebase);

    yield put(
      setModalErrorMessageAction({
        errorModalMessage: t('notepadScreen.notepadCleared'),
      }),
    );
  } catch (error) {
    if (error instanceof Error) {
      yield call(Sentry.captureException, error);
      yield put(setModalErrorMessageAction({ errorModalMessage: error.message }));
    }
  } finally {
    yield call(setNotepadText, '');
    yield call(setIsLoading, false);
    yield call(setModalVisible, false);
    yield call(setButtonDisabled, false);
  }
}
