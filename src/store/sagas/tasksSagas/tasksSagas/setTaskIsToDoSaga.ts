import { MOVE_TASK_IN_DONE } from '@components/snackBar/actions';
import { ONLINE, START_ANIMATION_DELAY } from '@constants/constants';
import { FIREBASE_PATH } from '@enums/firebaseEnum';
import { checkInternetConnectionHelper } from '@helpers/checkInternetConnectionHelper';
import { createNotificationHelper } from '@helpers/createNotificationHelper';
import { createFormattedDateHelper } from '@helpers/dateHelpers';
import { DB } from '@root/api/DB';
import { FirebaseNotificationType } from '@root/types/firebase/firebaseTypes';
import * as Sentry from '@sentry/react-native';
import { addSnackBarEventAction } from '@store/actions/snackBarActions/addSnackBarEventAction';
import { deleteTaskNotificationAction } from '@store/actions/tasksReducerActions/notificationsActions/deleteTaskNotificationAction';
import { setTaskTodoStatusAction } from '@store/actions/tasksReducerActions/tasksActions/setTaskTodoStatusAction';
import { SetTaskIsToDoSagaActionReturnType } from '@store/actions/tasksSagaActions/tasksSagasActions/setTaskIsToDoAction';
import { setModalMessageAction } from '@store/actions/userReducerActions/setModalMessageAction';
import { SnackBarEventType } from '@store/reducers/snackBarReducer/types';
import { NotificationType } from '@store/reducers/tasksReducer/types';
import {
  ChannelIDType,
  SnapshotType,
  UserIDType,
} from '@store/reducers/userReducer/types';
import { notificationsSelector } from '@store/selectors/tasksSelectors';
import { channelIDSelector, userIDSelector } from '@store/selectors/userSelectors';
import { call, cancel, delay, put, select } from 'redux-saga/effects';

const { IS_DONE, IS_TODO, NOTIFICATIONS, TASK_LISTS, TASKS, USERS, MODIFICATION_DATE } =
  FIREBASE_PATH;

export function* setTaskIsToDoSaga(action: SetTaskIsToDoSagaActionReturnType) {
  const {
    taskID,
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
    const channelId: ChannelIDType = yield select(channelIDSelector);

    const setTaskIsToDoInFirebase = () => {
      return DB.ref(
        `${USERS}/${userID}/${TASK_LISTS}/${taskListID}/${TASKS}/${taskID}`,
      ).update({ [IS_DONE]: false });
    };

    yield call(setTaskIsToDoInFirebase);

    const currentDateForTask = createFormattedDateHelper();

    const sendTaskModificationDateToFirebase = () => {
      return DB.ref(
        `${USERS}/${userID}/${TASK_LISTS}/${taskListID}/${TASKS}/${taskID}`,
      ).update({ [MODIFICATION_DATE]: currentDateForTask });
    };

    yield call(sendTaskModificationDateToFirebase);

    const notifications: NotificationType[] = yield select(notificationsSelector);

    const taskNotification = notifications.find((item) => {
      return taskID === item.taskID;
    });

    const notificationID = taskNotification?.notificationID;

    const doneSnapshot: SnapshotType = yield DB.ref(
      `${USERS}/${userID}/${NOTIFICATIONS}/${IS_DONE}/${taskListID}/${taskID}`,
    ).once('value');

    const doneTaskListNotificationsData = doneSnapshot.val();

    if (doneTaskListNotificationsData) {
      const removeDoneTaskNotificationFromFirebase = () => {
        return DB.ref(
          `${USERS}/${userID}/${NOTIFICATIONS}/${IS_DONE}/${taskListID}/${taskID}`,
        ).remove();
      };

      yield call(removeDoneTaskNotificationFromFirebase);
    }

    const currentDateForNotification = new Date();
    const deleteTaskNotificationCondition =
      taskNotification &&
      taskNotification.date &&
      taskNotification.date <= currentDateForNotification;

    // createTaskNotificationCondition
    if (
      taskNotification &&
      notificationID &&
      taskNotification.date &&
      taskNotification.date > currentDateForNotification
    ) {
      const firebaseNotification: FirebaseNotificationType = {
        date: taskNotification.date.toISOString(),
        notificationID,
        taskTitle,
        taskID,
      };

      const sendTodoTaskNotificationToFirebase = () => {
        return DB.ref(
          `${USERS}/${userID}/${NOTIFICATIONS}/${IS_TODO}/${taskListID}/${taskID}`,
        ).set(firebaseNotification);
      };

      yield call(sendTodoTaskNotificationToFirebase);

      yield call(createNotificationHelper, {
        channelId,
        date: taskNotification.date,
        notificationID,
        taskTitle,
      });
    }

    if (deleteTaskNotificationCondition) {
      yield put(deleteTaskNotificationAction({ taskID }));
    }

    yield put(
      setTaskTodoStatusAction({
        taskID,
        taskListID,
        isDone: false,
        modificationDate: currentDateForTask,
      }),
    );

    if (setSnackBarCancelFulfilled) {
      yield call(setSnackBarCancelFulfilled, true);
    }

    if (shouldCreateSnackBarEvent) {
      const event: SnackBarEventType = {
        taskID,
        taskListID,
        taskTitle,
        snackBarUntranslatedText: 'snackBar.taskIsToDo',
        action: MOVE_TASK_IN_DONE,
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
