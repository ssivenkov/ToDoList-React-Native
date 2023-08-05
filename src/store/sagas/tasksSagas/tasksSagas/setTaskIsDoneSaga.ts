import { MOVE_TASK_IN_TODO } from '@components/snackBar/actions';
import { ONLINE, START_ANIMATION_DELAY } from '@constants/constants';
import { FIREBASE_PATH } from '@enums/firebaseEnum';
import { cancelNotificationHelper } from '@helpers/cancelNotificationHelper';
import { checkInternetConnectionHelper } from '@helpers/checkInternetConnectionHelper';
import { DB } from '@root/api/DB';
import { FirebaseNotificationType } from '@root/types/firebase/firebaseTypes';
import * as Sentry from '@sentry/react-native';
import { addSnackBarEventAction } from '@store/actions/snackBarActions/addSnackBarEventAction';
import { setTaskIsDoneAction } from '@store/actions/tasksReducerActions/tasksActions/setTaskIsDoneAction';
import { SetTaskIsDoneSagaActionReturnType } from '@store/actions/tasksSagaActions/tasksSagasActions/setTaskIsDoneAction';
import { setModalMessageAction } from '@store/actions/userReducerActions/setModalMessageAction';
import { SnackBarEventType } from '@store/reducers/snackBarReducer/types';
import { NotificationType } from '@store/reducers/tasksReducer/types';
import { SnapshotType, UserIDType } from '@store/reducers/userReducer/types';
import { notificationsSelector } from '@store/selectors/tasksSelectors';
import { userIDSelector } from '@store/selectors/userSelectors';
import { call, cancel, delay, put, select } from 'redux-saga/effects';

const { IS_DONE, IS_TODO, NOTIFICATIONS, TASK_LISTS, TASKS, USERS } = FIREBASE_PATH;

export function* setTaskIsDoneSaga(action: SetTaskIsDoneSagaActionReturnType) {
  const {
    toDoTaskID,
    taskListID,
    taskTitle,
    setTaskPending,
    setSnackBarCancelPending,
    setTaskScreenBlocking,
    shouldCreateSnackBarEvent,
    setSnackBarCancelFulfilled,
  } = action.payload;

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

    const setTaskIsDoneInFirebase = () => {
      return DB.ref(
        `${USERS}/${userID}/${TASK_LISTS}/${taskListID}/${TASKS}/${toDoTaskID}`,
      ).update({ [IS_DONE]: true });
    };

    yield call(setTaskIsDoneInFirebase);

    const notifications: NotificationType[] = yield select(notificationsSelector);

    const taskNotification = notifications.find((item) => {
      return toDoTaskID === item.taskID;
    });

    const notificationID = taskNotification?.notificationID;

    const toDoSnapshot: SnapshotType = yield DB.ref(
      `${USERS}/${userID}/${NOTIFICATIONS}/${IS_TODO}/${taskListID}/${toDoTaskID}`,
    ).once('value');

    const toDoTaskListNotificationsData = toDoSnapshot.val();

    if (toDoTaskListNotificationsData) {
      const removeToDoTaskNotificationFromFirebase = () => {
        return DB.ref(
          `${USERS}/${userID}/${NOTIFICATIONS}/${IS_TODO}/${taskListID}/${toDoTaskID}`,
        ).remove();
      };

      yield call(removeToDoTaskNotificationFromFirebase);
    }

    if (taskNotification && taskNotification.date && notificationID) {
      const firebaseNotification: FirebaseNotificationType = {
        date: taskNotification.date.toISOString(),
        notificationID,
        taskTitle,
        taskID: toDoTaskID,
      };

      const sendDoneTaskNotificationToFirebase = () => {
        return DB.ref(
          `${USERS}/${userID}/${NOTIFICATIONS}/${IS_DONE}/${taskListID}/${toDoTaskID}`,
        ).set(firebaseNotification);
      };

      yield call(sendDoneTaskNotificationToFirebase);
    }

    if (taskNotification && notificationID) {
      cancelNotificationHelper(notificationID);
    }

    yield put(
      setTaskIsDoneAction({
        toDoTaskID,
        taskListID,
      }),
    );

    if (setSnackBarCancelFulfilled) {
      yield call(setSnackBarCancelFulfilled, true);
    }

    if (shouldCreateSnackBarEvent) {
      const event: SnackBarEventType = {
        taskID: toDoTaskID,
        taskListID,
        taskTitle,
        snackBarUntranslatedText: 'snackBar.taskIsDone',
        action: MOVE_TASK_IN_TODO,
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
