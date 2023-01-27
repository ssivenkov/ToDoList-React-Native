import { TASKS_SAGA_ACTION } from '@enums/tasksSagaEnum';
import * as Sentry from '@sentry/react-native';
import { WaitCloseTaskHorizontalMenuSagaActionReturnType } from '@store/actions/tasksSagaActions/tasksSagasActions/waitCloseTaskHorizontalMenuAction';
import { setModalMessageAction } from '@store/actions/userReducerActions/setModalMessageAction';
import { call, put, takeLatest } from 'redux-saga/effects';

export function* waitCloseTaskHorizontalMenuSaga(
  action: WaitCloseTaskHorizontalMenuSagaActionReturnType,
) {
  const { setIsMenuHorizontalVisible } = action.payload;

  try {
    yield takeLatest(TASKS_SAGA_ACTION.CLOSE_TASK_HORIZONTAL_MENU, () => {
      setIsMenuHorizontalVisible(false);
    });
  } catch (error) {
    if (error instanceof Error) {
      yield call(Sentry.captureException, error);
      yield put(setModalMessageAction({ modalMessage: error.message }));
    }
  }
}
