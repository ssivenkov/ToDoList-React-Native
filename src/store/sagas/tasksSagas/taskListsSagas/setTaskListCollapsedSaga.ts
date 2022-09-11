import { ONLINE, START_ANIMATION_DELAY, TASK_LISTS, USERS } from '@constants/constants';
import { DB } from '@root/api/DB';
import { checkInternetConnectionHelper } from '@root/helpers/checkInternetConnectionHelper';
import { setCollapsedTaskListAction } from '@store/actions/tasksReducerActions/taskListsActions/setTaskListCollapsedAction';
import { SetTaskListCollapsedSagaActionReturnType } from '@store/actions/tasksSagaActions/taskListsSagasActions/setTaskListCollapsedAction';
import { setGlobalLoaderAction } from '@store/actions/userReducerActions/setGlobalLoaderAction';
import { setModalErrorMessageAction } from '@store/actions/userReducerActions/setModalErrorMessageAction';
import { UserIDType } from '@store/reducers/userReducer/types';
import { userIDSelector } from '@store/selectors/userSelectors';
import { call, delay, put, select } from 'redux-saga/effects';

export function* setTaskListCollapsedSaga(
  action: SetTaskListCollapsedSagaActionReturnType,
) {
  const { taskListID, isTodoCollapsed, isDoneCollapsed } = action.payload;

  try {
    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      throw Error(internetConnectionStatus);
    }

    yield put(setGlobalLoaderAction({ globalLoader: true }));
    yield delay(START_ANIMATION_DELAY);
    const userID: UserIDType = yield select(userIDSelector);
    const sendTaskListCollapsedFieldsToFirebase = () => {
      return DB.ref(`${USERS}/${userID}/${TASK_LISTS}/${taskListID}`).update({
        isTodoCollapsed,
        isDoneCollapsed,
      });
    };

    yield call(sendTaskListCollapsedFieldsToFirebase);
    yield put(
      setCollapsedTaskListAction({
        taskListID,
        isTodoCollapsed,
        isDoneCollapsed,
      }),
    );
    yield put(setGlobalLoaderAction({ globalLoader: false }));
  } catch (error) {
    yield put(setGlobalLoaderAction({ globalLoader: false }));

    if (error instanceof Error) {
      yield put(setModalErrorMessageAction({ errorModalMessage: error.message }));
    }
  }
}
