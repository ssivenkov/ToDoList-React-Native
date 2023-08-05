import { ONLINE, START_ANIMATION_DELAY } from '@constants/constants';
import { FIREBASE_PATH } from '@enums/firebaseEnum';
import { cancelNotificationHelper } from '@helpers/cancelNotificationHelper';
import { checkInternetConnectionHelper } from '@helpers/checkInternetConnectionHelper';
import { findNotification } from '@helpers/findNotification';
import { DB } from '@root/api/DB';
import * as Sentry from '@sentry/react-native';
import { setNotificationsAction } from '@store/actions/tasksReducerActions/notificationsActions/setNotificationsAction';
import { deleteTaskListFromScreenAction } from '@store/actions/tasksReducerActions/taskListsActions/deleteTaskListFromScreenAction';
import { DeleteTaskListFromScreenSagaActionReturnType } from '@store/actions/tasksSagaActions/taskListsSagasActions/deleteTaskListFromScreenAction';
import { setModalMessageAction } from '@store/actions/userReducerActions/setModalMessageAction';
import {
  ConvertedTasksForFirebaseType,
  NotificationType,
} from '@store/reducers/tasksReducer/types';
import { SnapshotType, UserIDType } from '@store/reducers/userReducer/types';
import { notificationsSelector } from '@store/selectors/tasksSelectors';
import { userIDSelector } from '@store/selectors/userSelectors';
import { call, cancel, delay, put, select } from 'redux-saga/effects';

const { IS_DONE, IS_TODO, SHOW_IN_TODO, TASK_LISTS, TASKS, USERS, NOTIFICATIONS } =
  FIREBASE_PATH;

export function* deleteTaskListFromScreenSaga(
  action: DeleteTaskListFromScreenSagaActionReturnType,
) {
  const { setIsLoading, fullTaskList, deleteTodoTask, deleteDoneTask, setModalVisible } =
    action.payload;

  try {
    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      yield put(setModalMessageAction({ modalMessage: internetConnectionStatus }));

      yield cancel();
    }

    yield delay(START_ANIMATION_DELAY);

    yield call(setIsLoading, true);

    const userID: UserIDType = yield select(userIDSelector);
    const notifications: NotificationType[] = yield select(notificationsSelector);

    const notificationTaskIDs: string[] = [];

    const deleteTaskListFromScreenInFirebase = () => {
      const taskList = { ...fullTaskList };

      const { tasks, id: taskListID } = taskList;

      if (deleteTodoTask) {
        DB.ref(`${USERS}/${userID}/${TASK_LISTS}/${taskListID}`).update({
          [SHOW_IN_TODO]: false,
        });

        if (tasks && tasks.length > 0) {
          tasks.forEach((task) => {
            const { isDone, id: taskID } = task;

            const notificationItem = findNotification(taskID, notifications);

            const notificationID = notificationItem?.notificationID;

            if (!isDone) {
              notificationTaskIDs.push(taskID);
            }

            if (notificationID) {
              cancelNotificationHelper(notificationID);
            }
          });

          taskList.tasks = tasks.filter((task) => task.isDone);
        }
      }

      if (deleteDoneTask && tasks && tasks.length > 0) {
        taskList.tasks = tasks.filter((task) => !task.isDone);
      }

      if (taskList.tasks && taskList.tasks.length > 0) {
        const convertedTasksForFirebase: ConvertedTasksForFirebaseType =
          taskList.tasks.reduce((acc: ConvertedTasksForFirebaseType, task) => {
            return {
              ...acc,
              [task.id]: task,
            };
          }, {});

        return DB.ref(`${USERS}/${userID}/${TASK_LISTS}/${taskListID}/${TASKS}`).set(
          convertedTasksForFirebase,
        );
      }
    };

    yield call(deleteTaskListFromScreenInFirebase);

    if (deleteTodoTask) {
      const snapshot: SnapshotType = yield DB.ref(
        `${USERS}/${userID}/${NOTIFICATIONS}/${IS_TODO}/${fullTaskList.id}`,
      ).once('value');

      const toDoTaskListNotificationsData = snapshot.val();

      if (toDoTaskListNotificationsData) {
        const removeToDoTaskNotificationsFromFirebase = () => {
          return DB.ref(
            `${USERS}/${userID}/${NOTIFICATIONS}/${IS_TODO}/${fullTaskList.id}`,
          ).remove();
        };

        yield call(removeToDoTaskNotificationsFromFirebase);
      }
    } else if (deleteDoneTask) {
      const snapshot: SnapshotType = yield DB.ref(
        `${USERS}/${userID}/${NOTIFICATIONS}/${IS_DONE}/${fullTaskList.id}`,
      ).once('value');

      const doneTaskListNotificationsData = snapshot.val();

      if (doneTaskListNotificationsData) {
        const removeDoneTaskNotificationsFromFirebase = () => {
          return DB.ref(
            `${USERS}/${userID}/${NOTIFICATIONS}/${IS_DONE}/${fullTaskList.id}`,
          ).remove();
        };

        yield call(removeDoneTaskNotificationsFromFirebase);
      }
    }

    const filteredNotifications = notifications.filter((notification) => {
      const notificationToDelete =
        notificationTaskIDs.join(',').indexOf(notification.taskID) > -1;

      if (!notificationToDelete) {
        return true;
      }
    });

    yield put(setNotificationsAction({ notifications: filteredNotifications }));

    yield put(
      deleteTaskListFromScreenAction({
        deleteDoneTask,
        deleteTodoTask,
        fullTaskList,
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
