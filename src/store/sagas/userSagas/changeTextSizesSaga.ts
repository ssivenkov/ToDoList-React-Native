import { ONLINE, START_ANIMATION_DELAY } from '@constants/constants';
import { FIREBASE_PATH } from '@enums/firebaseEnum';
import { checkInternetConnectionHelper } from '@helpers/checkInternetConnectionHelper';
import { DB } from '@root/api/DB';
import * as Sentry from '@sentry/react-native';
import { setModalMessageAction } from '@store/actions/userReducerActions/setModalMessageAction';
import { setTextSizesAction } from '@store/actions/userReducerActions/setTextSizesAction';
import { ChangeTextSizesSagaActionReturnType } from '@store/actions/userSagaActions/changeTextSizesAction';
import { UserIDType } from '@store/reducers/userReducer/types';
import { userIDSelector } from '@store/selectors/userSelectors';
import { call, cancel, delay, put, select } from 'redux-saga/effects';

const {
  USERS,
  TEXT_SIZES,
  TASK_LIST_TITLE_SIZE,
  TASK_TEXT_SIZE,
  NOTEPAD_TEXT_SIZE,
  MODAL_WINDOW_TEXT_SIZE,
  MODAL_BUTTON_TEXT_SIZE,
} = FIREBASE_PATH;

export function* changeTextSizesSaga(action: ChangeTextSizesSagaActionReturnType) {
  const {
    goBack,
    modalButtonTextSize,
    notepadTextSize,
    setButtonDisabled,
    setLoading,
    modalWindowTextSize,
    taskListTitleSize,
    taskTextSize,
  } = action.payload;

  try {
    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      yield put(setModalMessageAction({ modalMessage: internetConnectionStatus }));

      yield cancel();
    }

    yield call(setLoading, true);
    yield call(setButtonDisabled, true);

    yield delay(START_ANIMATION_DELAY);

    const userID: UserIDType = yield select(userIDSelector);

    const sendTextSizeToFirebase = () => {
      const textSizes = {
        [TASK_LIST_TITLE_SIZE]: taskListTitleSize,
        [TASK_TEXT_SIZE]: taskTextSize,
        [NOTEPAD_TEXT_SIZE]: notepadTextSize,
        [MODAL_BUTTON_TEXT_SIZE]: modalButtonTextSize,
        [MODAL_WINDOW_TEXT_SIZE]: modalWindowTextSize,
      };

      return DB.ref(`${USERS}/${userID}/${TEXT_SIZES}`).set(textSizes);
    };

    yield call(sendTextSizeToFirebase);

    yield put(
      setTextSizesAction({
        modalButtonTextSize,
        modalWindowTextSize,
        taskListTitleSize,
        taskTextSize,
        notepadTextSize,
      }),
    );

    yield call(goBack);
  } catch (error) {
    if (error instanceof Error) {
      yield call(Sentry.captureException, error);
      yield put(setModalMessageAction({ modalMessage: error.message }));
    }

    yield call(setLoading, false);
    yield call(setButtonDisabled, false);
  }
}
