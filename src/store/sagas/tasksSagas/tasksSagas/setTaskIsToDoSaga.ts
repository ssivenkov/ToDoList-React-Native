import { moveTaskInDone } from '@components/snackBar/actions';
import { ONLINE, START_ANIMATION_DELAY } from '@constants/constants';
import { FIREBASE_PATH } from '@enums/firebaseEnum';
import { cancelNotificationHelper } from '@helpers/cancelNotificationHelper';
import { checkInternetConnectionHelper } from '@helpers/checkInternetConnectionHelper';
import { DB } from '@root/api/DB';
import * as Sentry from '@sentry/react-native';
import { addSnackBarEventAction } from '@store/actions/snackBarActions/addSnackBarEventAction';
import { deleteTaskNotificationAction } from '@store/actions/tasksReducerActions/notificationsActions/deleteTaskNotificationAction';
import { setTaskIsToDoAction } from '@store/actions/tasksReducerActions/tasksActions/setTaskIsToDoAction';
import { SetTaskIsToDoSagaActionReturnType } from '@store/actions/tasksSagaActions/tasksSagasActions/setTaskIsToDoAction';
import { setModalMessageAction } from '@store/actions/userReducerActions/setModalMessageAction';
import { SnackBarEventType } from '@store/reducers/snackBarReducer/types';
import { NotificationType } from '@store/reducers/tasksReducer/types';
import { UserIDType } from '@store/reducers/userReducer/types';
import { notificationsSelector } from '@store/selectors/tasksSelectors';
import { userIDSelector } from '@store/selectors/userSelectors';
import { call, cancel, delay, put, select } from 'redux-saga/effects';

export function* setTaskIsToDoSaga(action: SetTaskIsToDoSagaActionReturnType) {
  const {
    doneTaskID,
    taskListID,
    setTaskPending,
    setSnackBarCancelPending,
    setTaskScreenBlocking,
    shouldCreateSnackBarEvent,
    setSnackBarCancelFulfilled,
  } = action.payload;

  const { IS_DONE, TASK_LISTS, TASKS, USERS } = FIREBASE_PATH;

  try {
    if (setTaskPending) {
      yield call(setTaskPending, true);
    } else if (setSnackBarCancelPending) {
      yield call(setSnackBarCancelPending, true);
    }

    yield delay(START_ANIMATION_DELAY);

    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      yield put(setModalMessageAction({ modalMessage: internetConnectionStatus }));

      if (setTaskPending) {
        yield call(setTaskPending, false);
      }

      if (setTaskScreenBlocking) {
        yield call(setTaskScreenBlocking, false);
      }

      yield cancel();
    }

    const userID: UserIDType = yield select(userIDSelector);

    const setTaskIsToDoInFirebase = () => {
      return DB.ref(
        `${USERS}/${userID}/${TASK_LISTS}/${taskListID}/${TASKS}/${doneTaskID}`,
      ).update({ [IS_DONE]: false });
    };

    yield call(setTaskIsToDoInFirebase);

    const notifications: NotificationType[] = yield select(notificationsSelector);

    const taskNotification = notifications.find((item) => {
      return doneTaskID === item.taskID;
    });

    const notificationID = taskNotification?.notificationID;

    if (taskNotification && notificationID) {
      cancelNotificationHelper(notificationID);
    }

    yield put(deleteTaskNotificationAction({ taskID: doneTaskID }));

    yield put(
      setTaskIsToDoAction({
        doneTaskID,
        taskListID,
      }),
    );

    if (setSnackBarCancelFulfilled) {
      yield call(setSnackBarCancelFulfilled, true);
    }

    if (shouldCreateSnackBarEvent) {
      const event: SnackBarEventType = {
        taskID: doneTaskID,
        taskListID,
        snackBarUntranslatedText: 'snackBar.taskIsToDo',
        action: moveTaskInDone,
      };

      yield put(addSnackBarEventAction({ event }));
    }
  } catch (error) {
    if (error instanceof Error) {
      yield call(Sentry.captureException, error);
      yield put(setModalMessageAction({ modalMessage: error.message }));

      if (setTaskPending) {
        yield call(setTaskPending, false);
      }

      if (setTaskScreenBlocking) {
        yield call(setTaskScreenBlocking, false);
      }
    }
  }
}
