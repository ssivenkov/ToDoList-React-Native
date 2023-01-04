import { ONLINE, START_ANIMATION_DELAY } from '@constants/constants';
import { FIREBASE_PATH } from '@enums/firebaseEnum';
import { checkInternetConnectionHelper } from '@helpers/checkInternetConnectionHelper';
import { DB } from '@root/api/DB';
import * as Sentry from '@sentry/react-native';
import { addNewTaskListAction } from '@store/actions/tasksReducerActions/taskListsActions/addNewTaskListAction';
import { AddNewTaskListSagaActionReturnType } from '@store/actions/tasksSagaActions/taskListsSagasActions/addNewTaskListAction';
import { setModalMessageAction } from '@store/actions/userReducerActions/setModalMessageAction';
import { UserIDType } from '@store/reducers/userReducer/types';
import { userIDSelector } from '@store/selectors/userSelectors';
import { call, delay, put, select, cancel } from 'redux-saga/effects';

export function* addNewTaskListSaga(action: AddNewTaskListSagaActionReturnType) {
  const { taskList, setIsLoading, setModalVisible, setTaskListTitle } = action.payload;

  const { id: taskListID } = taskList;

  const { TASK_LISTS, USERS } = FIREBASE_PATH;

  try {
    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      yield put(setModalMessageAction({ modalMessage: internetConnectionStatus }));

      yield cancel();
    }

    yield call(setIsLoading, true);

    yield delay(START_ANIMATION_DELAY);

    const userID: UserIDType = yield select(userIDSelector);

    const addNewTaskListToFirebase = () => {
      return DB.ref(`${USERS}/${userID}/${TASK_LISTS}/${taskListID}`).set(taskList);
    };

    yield call(addNewTaskListToFirebase);

    yield put(addNewTaskListAction({ taskList }));

    yield call(setModalVisible, false);
    yield call(setTaskListTitle, '');
  } catch (error) {
    if (error instanceof Error) {
      yield call(Sentry.captureException, error);
      yield put(setModalMessageAction({ modalMessage: error.message }));
    }
  } finally {
    yield call(setIsLoading, false);
  }
}
