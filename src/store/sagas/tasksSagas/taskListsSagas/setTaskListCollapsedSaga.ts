import { setCollapsedTaskListAction } from '@store/actions/tasksReducerActions/taskListsActions/setTaskListCollapsedAction';
import { SetTaskListCollapsedSagaActionReturnType } from '@store/actions/tasksSagaActions/taskListsSagasActions/setTaskListCollapsedAction';
import { put } from 'redux-saga/effects';

export function* setTaskListCollapsedSaga(
  action: SetTaskListCollapsedSagaActionReturnType,
) {
  const { taskListID, isTodoCollapsed, isDoneCollapsed } = action.payload;

  yield put(
    setCollapsedTaskListAction({
      taskListID,
      isTodoCollapsed,
      isDoneCollapsed,
    }),
  );
}
