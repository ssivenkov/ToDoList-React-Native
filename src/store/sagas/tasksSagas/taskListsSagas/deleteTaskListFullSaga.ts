import { ONLINE, START_ANIMATION_DELAY } from '@constants/constants';
import { FIREBASE_PATH } from '@enums/firebaseEnum';
import { cancelNotificationHelper } from '@helpers/cancelNotificationHelper';
import { checkInternetConnectionHelper } from '@helpers/checkInternetConnectionHelper';
import { findNotification } from '@helpers/findNotification';
import { DB } from '@root/api/DB';
import * as Sentry from '@sentry/react-native';
import { setNotificationsAction } from '@store/actions/tasksReducerActions/notificationsActions/setNotificationsAction';
import { deleteTaskListFullAction } from '@store/actions/tasksReducerActions/taskListsActions/deleteTaskListFullAction';
import { DeleteTaskListFullSagaActionReturnType } from '@store/actions/tasksSagaActions/taskListsSagasActions/deleteTaskListFullAction';
import { setModalMessageAction } from '@store/actions/userReducerActions/setModalMessageAction';
import { NotificationType, TaskListType } from '@store/reducers/tasksReducer/types';
import { SnapshotType, UserIDType } from '@store/reducers/userReducer/types';
import {
  notificationsSelector,
  taskListsSelector,
} from '@store/selectors/tasksSelectors';
import { userIDSelector } from '@store/selectors/userSelectors';
import { call, cancel, delay, put, select } from 'redux-saga/effects';

const { IS_DONE, IS_TODO, TASK_LISTS, USERS, NOTIFICATIONS } = FIREBASE_PATH;

export function* deleteTaskListFullSaga(action: DeleteTaskListFullSagaActionReturnType) {
  const { setIsLoading, setModalVisible, taskListID } = action.payload;

  try {
    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      yield put(setModalMessageAction({ modalMessage: internetConnectionStatus }));

      yield cancel();
    }

    yield call(setIsLoading, true);

    yield delay(START_ANIMATION_DELAY);

    const userID: UserIDType = yield select(userIDSelector);
    const notifications: NotificationType[] = yield select(notificationsSelector);
    const taskLists: TaskListType[] = yield select(taskListsSelector);

    const taskList = taskLists.find((taskList) => taskList.id === taskListID);

    const deleteTaskListInFirebase = () => {
      return DB.ref(`${USERS}/${userID}/${TASK_LISTS}/${taskListID}`).remove();
    };

    yield call(deleteTaskListInFirebase);

    const toDoSnapshot: SnapshotType = yield DB.ref(
      `${USERS}/${userID}/${NOTIFICATIONS}/${IS_TODO}/${taskListID}`,
    ).once('value');

    const toDoTaskListNotificationsData = toDoSnapshot.val();

    if (toDoTaskListNotificationsData) {
      const removeToDoTaskNotificationsFromFirebase = () => {
        return DB.ref(
          `${USERS}/${userID}/${NOTIFICATIONS}/${IS_TODO}/${taskListID}`,
        ).remove();
      };

      yield call(removeToDoTaskNotificationsFromFirebase);
    }

    const doneSnapshot: SnapshotType = yield DB.ref(
      `${USERS}/${userID}/${NOTIFICATIONS}/${IS_DONE}/${taskListID}`,
    ).once('value');

    const doneTaskListNotificationsData = doneSnapshot.val();

    if (doneTaskListNotificationsData) {
      const removeDoneTaskNotificationsFromFirebase = () => {
        return DB.ref(
          `${USERS}/${userID}/${NOTIFICATIONS}/${IS_DONE}/${taskListID}`,
        ).remove();
      };

      yield call(removeDoneTaskNotificationsFromFirebase);
    }

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
      yield put(setModalMessageAction({ modalMessage: error.message }));
    }
  } finally {
    yield call(setIsLoading, false);
  }
}
