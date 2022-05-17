import {TASK_LISTS, USERS} from '@constants/constants';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {DB} from '@root/api/DB';
import {errorAlert} from '@root/helpers/alertHelper';
import {cancelNotificationHelper} from '@root/helpers/cancelNotificationHelper';
import {findNotification} from '@root/helpers/findNotification';
import {hasInternetConnectionHelper} from '@root/helpers/hasInternetConnectionHelper';
import {setNotificationsAction} from '@store/actions/tasksReducerActions/notificationsActions/setNotificationsAction';
import {deleteTaskListFullAction} from '@store/actions/tasksReducerActions/taskListsActions/deleteTaskListFullAction';
import {DeleteTaskListFullSagaActionReturnType} from '@store/actions/tasksSagaActions/taskListsSagasActions/deleteTaskListFullAction';
import {UserIDType} from '@store/reducers/authReducer/types';
import {
  NotificationType,
  TaskListInterface,
} from '@store/reducers/tasksReducer/types';
import {userIDSelector} from '@store/selectors/authSelectors';
import {
  notificationsSelector,
  taskListsSelector,
} from '@store/selectors/tasksSelectors';
import {t} from 'i18next';
import {call, delay, put, select} from 'redux-saga/effects';

export function* deleteTaskListFullSaga(
  action: DeleteTaskListFullSagaActionReturnType,
) {
  const {setIsLoading, setModalVisible, taskListID} = action.payload;
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();
    if (!hasInternetConnectionHelper(connectionStatus)) {
      errorAlert(t('common.NoInternetConnection'));
      return;
    }
    yield delay(10);

    yield call(setIsLoading, true);
    const userID: UserIDType = yield select(userIDSelector);
    const notifications: NotificationType[] = yield select(
      notificationsSelector,
    );
    const taskLists: TaskListInterface[] = yield select(taskListsSelector);
    const taskList = taskLists.find((taskList) => taskList.id === taskListID);

    const deleteTaskListInFirebase = () => {
      return DB.ref(`${USERS}/${userID}/${TASK_LISTS}/${taskListID}`).remove();
    };

    yield call(deleteTaskListInFirebase);

    if (taskList && taskList.tasks) {
      const {tasks} = taskList;
      const notificationTaskIDs: string[] = [];

      tasks.forEach((task) => {
        const {id: taskID} = task;
        const notificationItem = findNotification(taskID, notifications);
        const notificationID = notificationItem?.notificationID;

        notificationTaskIDs.push(taskID);

        if (notificationID) cancelNotificationHelper(notificationID);
      });

      const filteredNotifications = notifications.filter((notification) => {
        const notificationToDelete =
          notificationTaskIDs.join(',').indexOf(notification.taskID) > -1;

        if (!notificationToDelete) return true;
      });

      yield put(setNotificationsAction({notifications: filteredNotifications}));
    }

    yield put(
      deleteTaskListFullAction({
        taskListID,
      }),
    );
    yield call(setIsLoading, false);
    yield call(setModalVisible, false);
  } catch (error) {
    yield call(setIsLoading, false);
    errorAlert(error);
  }
}
