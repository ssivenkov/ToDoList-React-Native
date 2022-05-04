import {TASK_LISTS, TASKS, USERS} from '@constants/constants';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {DB} from '@root/api/DB';
import {errorAlert} from '@root/helpers/alertHelper';
import {cancelNotificationHelper} from '@root/helpers/cancelNotificationHelper';
import {delayHelper} from '@root/helpers/delayHelper';
import {setTasksNotificationsAction} from '@store/actions/tasksReducerActions/notificationsActions/setTasksNotificationsAction';
import {deleteTaskListFromScreenAction} from '@store/actions/tasksReducerActions/taskListsActions/deleteTaskListFromScreenAction';
import {
  DeleteTaskListFromScreenSagaActionReturnType,
  DeleteTaskListFromScreenSagaPayloadType,
} from '@store/actions/tasksSagaActions/taskListsSagasActions/deleteTaskListFromScreenAction';
import {UserIDType} from '@store/reducers/authReducer/types';
import {
  ConvertedTasksForFirebaseType,
  NotificationType,
} from '@store/reducers/tasksReducer/types';
import {getUserID} from '@store/selectors/authSelectors';
import {getNotifications} from '@store/selectors/tasksSelectors';
import {t} from 'i18next';
import {call, put, select} from 'redux-saga/effects';

export function* deleteTaskListFromScreenSaga(
  action: DeleteTaskListFromScreenSagaActionReturnType,
) {
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();
    if (!connectionStatus.isInternetReachable) {
      errorAlert(t('common.NoInternetConnection'));
      return;
    }
    yield call(delayHelper, 10);

    yield call(action.payload.setIsLoading, true);
    const userID: UserIDType = yield select(getUserID);
    const notifications: NotificationType[] = yield select(getNotifications);
    const findNotificationItem = (taskID: string) => {
      return notifications.find((item) => item.taskID === taskID);
    };

    const notificationTaskIDs: string[] = [];

    const deleteTaskListFromScreenInFirebase = (
      payload: DeleteTaskListFromScreenSagaPayloadType,
    ) => {
      const modifiedTaskList = {...payload.fullTaskList};

      if (payload.deleteTodoTask) {
        DB.ref(
          `${USERS}/${userID}/${TASK_LISTS}/${modifiedTaskList.id}`,
        ).update({
          showInToDo: false,
        });

        if (modifiedTaskList.tasks && modifiedTaskList.tasks.length > 0) {
          modifiedTaskList.tasks.forEach((task) => {
            if (!task.isDone) notificationTaskIDs.push(task.id);

            const notificationItem = findNotificationItem(task.id);

            if (notificationItem && notificationItem.notificationID) {
              cancelNotificationHelper(notificationItem.notificationID);
            }
          });

          modifiedTaskList.tasks = modifiedTaskList.tasks.filter(
            (task) => task.isDone,
          );
        }
      }

      if (payload.deleteDoneTask) {
        if (modifiedTaskList.tasks && modifiedTaskList.tasks.length > 0) {
          modifiedTaskList.tasks = modifiedTaskList.tasks.filter(
            (task) => !task.isDone,
          );
        }
      }

      if (modifiedTaskList.tasks && modifiedTaskList.tasks.length > 0) {
        const convertedTasksForFirebase: ConvertedTasksForFirebaseType =
          modifiedTaskList.tasks.reduce(
            (acc: ConvertedTasksForFirebaseType, task) => {
              return {
                ...acc,
                [task.id]: task,
              };
            },
            {},
          );

        return DB.ref(
          `${USERS}/${userID}/${TASK_LISTS}/${modifiedTaskList.id}/${TASKS}`,
        ).set(convertedTasksForFirebase);
      }
    };

    yield call(deleteTaskListFromScreenInFirebase, action.payload);

    yield put(setTasksNotificationsAction({notificationTaskIDs}));

    yield put(
      deleteTaskListFromScreenAction({
        deleteTodoTask: action.payload.deleteTodoTask,
        deleteDoneTask: action.payload.deleteDoneTask,
        fullTaskList: action.payload.fullTaskList,
      }),
    );
    yield call(action.payload.setIsLoading, false);
    yield call(action.payload.setModalVisible, false);
  } catch (error) {
    yield call(action.payload.setIsLoading, false);
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}
