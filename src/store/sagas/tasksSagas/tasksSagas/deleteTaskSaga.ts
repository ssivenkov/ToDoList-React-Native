import {
  ONLINE,
  START_ANIMATION_DELAY,
  TASK_LISTS,
  TASKS,
  USERS,
} from '@constants/constants';
import { DB } from '@root/api/DB';
import { cancelNotificationHelper } from '@root/helpers/cancelNotificationHelper';
import { checkInternetConnectionHelper } from '@root/helpers/checkInternetConnectionHelper';
import { deleteTaskNotificationAction } from '@store/actions/tasksReducerActions/notificationsActions/deleteTaskNotificationAction';
import { deleteTaskAction } from '@store/actions/tasksReducerActions/tasksActions/deleteTaskAction';
import { DeleteTaskSagaActionReturnType } from '@store/actions/tasksSagaActions/tasksSagasActions/deleteTaskAction';
import { setModalErrorMessageAction } from '@store/actions/userReducerActions/setModalErrorMessageAction';
import { NotificationType } from '@store/reducers/tasksReducer/types';
import { UserIDType } from '@store/reducers/userReducer/types';
import { notificationsSelector } from '@store/selectors/tasksSelectors';
import { userIDSelector } from '@store/selectors/userSelectors';
import { call, delay, put, select } from 'redux-saga/effects';

export function* deleteTaskSaga(action: DeleteTaskSagaActionReturnType) {
  const { setIsLoading, setModalVisible, taskListID, taskID } = action.payload;

  try {
    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      throw Error(internetConnectionStatus);
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

    yield call(setIsLoading, false);
    yield call(setModalVisible, false);
  } catch (error) {
    yield call(setIsLoading, false);

    if (error instanceof Error) {
      yield put(setModalErrorMessageAction({ errorModalMessage: error.message }));
    }
  }
}
