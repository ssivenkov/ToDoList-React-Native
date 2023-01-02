import { ONLINE, START_ANIMATION_DELAY, TASK_LISTS, USERS } from '@constants/constants';
import { DB } from '@root/api/DB';
import { cancelNotificationHelper } from '@root/helpers/cancelNotificationHelper';
import { checkInternetConnectionHelper } from '@root/helpers/checkInternetConnectionHelper';
import { findNotification } from '@root/helpers/findNotification';
import * as Sentry from '@sentry/react-native';
import { setNotificationsAction } from '@store/actions/tasksReducerActions/notificationsActions/setNotificationsAction';
import { deleteTaskListFullAction } from '@store/actions/tasksReducerActions/taskListsActions/deleteTaskListFullAction';
import { DeleteTaskListFullSagaActionReturnType } from '@store/actions/tasksSagaActions/taskListsSagasActions/deleteTaskListFullAction';
import { setModalErrorMessageAction } from '@store/actions/userReducerActions/setModalErrorMessageAction';
import { NotificationType, TaskListInterface } from '@store/reducers/tasksReducer/types';
import { UserIDType } from '@store/reducers/userReducer/types';
import {
  notificationsSelector,
  taskListsSelector,
} from '@store/selectors/tasksSelectors';
import { userIDSelector } from '@store/selectors/userSelectors';
import { call, cancel, delay, put, select } from 'redux-saga/effects';

export function* deleteTaskListFullSaga(action: DeleteTaskListFullSagaActionReturnType) {
  const { setIsLoading, setModalVisible, taskListID } = action.payload;

  try {
    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      yield put(
        setModalErrorMessageAction({ errorModalMessage: internetConnectionStatus }),
      );

      yield cancel();
    }

    yield call(setIsLoading, true);
    yield delay(START_ANIMATION_DELAY);
    const userID: UserIDType = yield select(userIDSelector);
    const notifications: NotificationType[] = yield select(notificationsSelector);
    const taskLists: TaskListInterface[] = yield select(taskListsSelector);
    const taskList = taskLists.find((taskList) => taskList.id === taskListID);

    const deleteTaskListInFirebase = () => {
      return DB.ref(`${USERS}/${userID}/${TASK_LISTS}/${taskListID}`).remove();
    };

    yield call(deleteTaskListInFirebase);

    if (taskList && taskList.tasks) {
      const { tasks } = taskList;
      const notificationTaskIDs: string[] = [];

      tasks.forEach((task) => {
        const { id: taskID } = task;
        const notificationItem = findNotification(taskID, notifications);
        const notificationID = notificationItem?.notificationID;

        notificationTaskIDs.push(taskID);

        if (notificationID) {
          cancelNotificationHelper(notificationID);
        }
      });

      const filteredNotifications = notifications.filter((notification) => {
        const notificationToDelete =
          notificationTaskIDs.join(',').indexOf(notification.taskID) > -1;

        if (!notificationToDelete) {
          return true;
        }
      });

      yield put(setNotificationsAction({ notifications: filteredNotifications }));
    }

    yield put(
      deleteTaskListFullAction({
        taskListID,
      }),
    );
    yield call(setModalVisible, false);
  } catch (error) {
    if (error instanceof Error) {
      yield call(Sentry.captureException, error);
      yield put(setModalErrorMessageAction({ errorModalMessage: error.message }));
    }
  } finally {
    yield call(setIsLoading, false);
  }
}
