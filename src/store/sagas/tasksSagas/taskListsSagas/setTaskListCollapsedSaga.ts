import * as Sentry from '@sentry/react-native';
import { setCollapsedTaskListAction } from '@store/actions/tasksReducerActions/taskListsActions/setTaskListCollapsedAction';
import { SetTaskListCollapsedSagaActionReturnType } from '@store/actions/tasksSagaActions/taskListsSagasActions/setTaskListCollapsedAction';
import { setModalErrorMessageAction } from '@store/actions/userReducerActions/setModalErrorMessageAction';
import { call, put } from 'redux-saga/effects';

export function* setTaskListCollapsedSaga(
  action: SetTaskListCollapsedSagaActionReturnType,
) {
  const { taskListID, isTodoCollapsed, isDoneCollapsed } = action.payload;

  try {
    yield put(
      setCollapsedTaskListAction({
        taskListID,
        isTodoCollapsed,
        isDoneCollapsed,
      }),
    );
  } catch (error) {
    if (error instanceof Error) {
      yield call(Sentry.captureException, error);
      yield put(setModalErrorMessageAction({ errorModalMessage: error.message }));
    }
  }
}
