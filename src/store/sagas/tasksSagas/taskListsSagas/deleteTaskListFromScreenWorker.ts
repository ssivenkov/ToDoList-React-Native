import {taskLists, tasks, Users} from '@constants/constants';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {DB} from '@root/api/DB';
import {errorAlert} from '@root/helpers/alert';
import {cancelNotification} from '@root/helpers/cancelNotification';
import {delay} from '@root/helpers/delay';
import {setTasksNotifications} from '@store/actions/tasksReducerActions/notificationsActions/setTasksNotifications';
import {deleteTaskListFromScreen} from '@store/actions/tasksReducerActions/taskListsActions/deleteTaskListFromScreen';
import {
  DeleteTaskListFromScreenSagaActionReturnType,
  DeleteTaskListFromScreenSagaPayloadType,
} from '@store/actions/tasksSagaActions/taskListsSagasActions/deleteTaskListFromScreen';
import {UserIDType} from '@store/reducers/authReducer/types';
import {
  ConvertedTasksForFirebaseType,
  NotificationType,
} from '@store/reducers/tasksReducer/types';
import {getUserID} from '@store/selectors/authSelectors';
import {getNotifications} from '@store/selectors/tasksSelectors';
import {t} from 'i18next';
import {call, put, select} from 'redux-saga/effects';

export function* deleteTaskListFromScreenWorker(
  action: DeleteTaskListFromScreenSagaActionReturnType,
) {
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();
    if (!connectionStatus.isInternetReachable) {
      errorAlert(t('common.NoInternetConnection'));
      return;
    }
    yield call(delay, 10);

    yield call(action.payload.setIsLoading, true);
    const userID: UserIDType = yield select(getUserID);
    const notifications: NotificationType[] = yield select(getNotifications);
    const findNotificationItem = (taskID: string) => {
      return notifications.find((item) => item.taskID === taskID);
    };

    const tasksNotifications: string[] = [];

    const deleteTaskListFromScreenInFirebase = (
      payload: DeleteTaskListFromScreenSagaPayloadType,
    ) => {
      const modifiedTaskList = {...payload.fullTaskList};

      if (payload.deleteTodoTask) {
        DB.ref(`${Users}/${userID}/${taskLists}/${modifiedTaskList.id}`).update(
          {
            showInToDo: false,
          },
        );

        if (modifiedTaskList.tasks && modifiedTaskList.tasks.length > 0) {
          modifiedTaskList.tasks.forEach((task) => {
            if (!task.isDone) tasksNotifications.push(task.id);

            const notificationItem = findNotificationItem(task.id);

            if (notificationItem && notificationItem.notificationID) {
              cancelNotification(notificationItem.notificationID);
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
          `${Users}/${userID}/${taskLists}/${modifiedTaskList.id}/${tasks}`,
        ).set(convertedTasksForFirebase);
      }
    };

    yield call(deleteTaskListFromScreenInFirebase, action.payload);

    yield put(setTasksNotifications({notifications: tasksNotifications}));

    yield put(
      deleteTaskListFromScreen({
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
