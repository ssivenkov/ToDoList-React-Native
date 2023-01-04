import { ONLINE, START_ANIMATION_DELAY } from '@constants/constants';
import { FIREBASE_PATH } from '@enums/firebaseEnum';
import { cancelNotificationHelper } from '@helpers/cancelNotificationHelper';
import { checkInternetConnectionHelper } from '@helpers/checkInternetConnectionHelper';
import { DB } from '@root/api/DB';
import * as Sentry from '@sentry/react-native';
import { deleteTaskNotificationAction } from '@store/actions/tasksReducerActions/notificationsActions/deleteTaskNotificationAction';
import { deleteTaskAction } from '@store/actions/tasksReducerActions/tasksActions/deleteTaskAction';
import { DeleteTaskSagaActionReturnType } from '@store/actions/tasksSagaActions/tasksSagasActions/deleteTaskAction';
import { setModalMessageAction } from '@store/actions/userReducerActions/setModalMessageAction';
import { NotificationType } from '@store/reducers/tasksReducer/types';
import { UserIDType } from '@store/reducers/userReducer/types';
import { notificationsSelector } from '@store/selectors/tasksSelectors';
import { userIDSelector } from '@store/selectors/userSelectors';
import { call, cancel, delay, put, select } from 'redux-saga/effects';

export function* deleteTaskSaga(action: DeleteTaskSagaActionReturnType) {
  const { setIsLoading, setModalVisible, taskListID, taskID } = action.payload;

  const { TASK_LISTS, TASKS, USERS } = FIREBASE_PATH;

  try {
    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      yield put(setModalMessageAction({ modalMessage: internetConnectionStatus }));

      yield cancel();
    }

    yield call(setIsLoading, true);

    yield delay(START_ANIMATION_DELAY);

    const userID: UserIDType = yield select(userIDSelector);

    const deleteTaskInFirebase = () => {
      return DB.ref(
        `${USERS}/${userID}/${TASK_LISTS}/${taskListID}/${TASKS}/${taskID}`,
      ).remove();
    };

    yield call(deleteTaskInFirebase);

    const notifications: NotificationType[] = yield select(notificationsSelector);

    const taskNotification = notifications.find((item) => {
      return taskID === item.taskID;
    });
    const notificationID = taskNotification?.notificationID;

    if (taskNotification && notificationID) {
      cancelNotificationHelper(notificationID);
    }

    yield put(deleteTaskNotificationAction({ taskID }));

    yield put(
      deleteTaskAction({
        taskID,
        taskListID,
      }),
    );

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
