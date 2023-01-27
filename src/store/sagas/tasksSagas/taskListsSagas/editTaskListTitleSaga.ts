import { ONLINE, START_ANIMATION_DELAY } from '@constants/constants';
import { FIREBASE_PATH } from '@enums/firebaseEnum';
import { checkInternetConnectionHelper } from '@helpers/checkInternetConnectionHelper';
import { DB } from '@root/api/DB';
import * as Sentry from '@sentry/react-native';
import { setEditedTaskListTitleAction } from '@store/actions/tasksReducerActions/taskListsActions/setEditedTaskListTitleAction';
import { EditTaskListTitleSagaActionReturnType } from '@store/actions/tasksSagaActions/taskListsSagasActions/editTaskListTitleAction';
import { setModalMessageAction } from '@store/actions/userReducerActions/setModalMessageAction';
import { UserIDType } from '@store/reducers/userReducer/types';
import { userIDSelector } from '@store/selectors/userSelectors';
import { call, cancel, delay, put, select } from 'redux-saga/effects';

export function* editTaskListTitleSaga(action: EditTaskListTitleSagaActionReturnType) {
  const {
    setIsLoading,
    setModalVisible,
    taskListID,
    editedTaskListTitle,
    setEditedTaskListTitleState,
  } = action.payload;

  const { TASK_LISTS, TITLE, USERS } = FIREBASE_PATH;

  try {
    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      yield put(setModalMessageAction({ modalMessage: internetConnectionStatus }));

      yield cancel();
    }

    yield call(setIsLoading, true);

    yield delay(START_ANIMATION_DELAY);

    const userID: UserIDType = yield select(userIDSelector);

    const sendModifiedTaskListToFirebase = () => {
      return DB.ref(`${USERS}/${userID}/${TASK_LISTS}/${taskListID}`).update({
        [TITLE]: editedTaskListTitle,
      });
    };

    yield call(sendModifiedTaskListToFirebase);

    yield put(
      setEditedTaskListTitleAction({
        editedTaskListTitle,
        taskListID,
      }),
    );

    yield call(setModalVisible, false);
    yield call(setEditedTaskListTitleState, editedTaskListTitle);
  } catch (error) {
    if (error instanceof Error) {
      yield call(Sentry.captureException, error);
      yield put(setModalMessageAction({ modalMessage: error.message }));
    }
  } finally {
    yield call(setIsLoading, false);
  }
}
