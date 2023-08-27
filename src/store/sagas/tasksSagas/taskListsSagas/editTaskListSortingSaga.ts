import { ONLINE, START_ANIMATION_DELAY } from '@constants/constants';
import { FIREBASE_PATH } from '@enums/firebaseEnum';
import { checkInternetConnectionHelper } from '@helpers/checkInternetConnectionHelper';
import { DB } from '@root/api/DB';
import * as Sentry from '@sentry/react-native';
import { setEditedTaskListSortingAction } from '@store/actions/tasksReducerActions/taskListsActions/setEditedTaskListSortingAction';
import { EditTaskListSortingSagaActionReturnType } from '@store/actions/tasksSagaActions/taskListsSagasActions/editTaskListSortingAction';
import { setModalMessageAction } from '@store/actions/userReducerActions/setModalMessageAction';
import { UserIDType } from '@store/reducers/userReducer/types';
import { userIDSelector } from '@store/selectors/userSelectors';
import { call, cancel, delay, put, select } from 'redux-saga/effects';

export function* editTaskListSortingSaga(
  action: EditTaskListSortingSagaActionReturnType,
) {
  const {
    setIsLoading,
    setModalVisible,
    taskListID,
    setIsMenuHorizontalVisible,
    editedTaskListSorting,
  } = action.payload;

  const { TASK_LISTS, SORTING, USERS } = FIREBASE_PATH;

  try {
    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      yield put(setModalMessageAction({ modalMessage: internetConnectionStatus }));

      yield cancel();
    }

    yield call(setIsLoading, true);

    yield delay(START_ANIMATION_DELAY);

    const userID: UserIDType = yield select(userIDSelector);

    const sendModifiedTaskListSortingToFirebase = () => {
      return DB.ref(`${USERS}/${userID}/${TASK_LISTS}/${taskListID}`).update({
        [SORTING]: editedTaskListSorting,
      });
    };

    yield call(sendModifiedTaskListSortingToFirebase);

    yield put(
      setEditedTaskListSortingAction({
        editedTaskListSorting,
        taskListID,
      }),
    );

    yield call(setIsMenuHorizontalVisible, false);
    yield call(setModalVisible, false);
  } catch (error) {
    if (error instanceof Error) {
      yield call(Sentry.captureException, error);
      yield put(setModalMessageAction({ modalMessage: error.message }));
    }
  } finally {
    yield call(setIsLoading, false);
  }
}
