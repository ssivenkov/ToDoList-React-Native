import {TASK_LISTS, USERS} from '@constants/constants';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {DB} from '@root/api/DB';
import {errorAlert} from '@root/helpers/alertHelper';
import {cancelNotificationHelper} from '@root/helpers/cancelNotificationHelper';
import {setTasksNotificationsAction} from '@store/actions/tasksReducerActions/notificationsActions/setTasksNotificationsAction';
import {deleteTaskListFullAction} from '@store/actions/tasksReducerActions/taskListsActions/deleteTaskListFullAction';
import {
  DeleteTaskListFullSagaActionReturnType,
  DeleteTaskListFullSagaPayloadType,
} from '@store/actions/tasksSagaActions/taskListsSagasActions/deleteTaskListFullAction';
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
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();
    if (!connectionStatus.isInternetReachable) {
      errorAlert(t('common.NoInternetConnection'));
      return;
    }
    yield delay(10);

    yield call(action.payload.setIsLoading, true);
    const userID: UserIDType = yield select(userIDSelector);
    const deleteTaskListInFirebase = (
      payload: DeleteTaskListFullSagaPayloadType,
    ): Promise<void> => {
      return DB.ref(
        `${USERS}/${userID}/${TASK_LISTS}/${payload.taskListId}`,
      ).remove();
    };
    yield call(deleteTaskListInFirebase, action.payload);

    const taskListsArr: TaskListInterface[] = yield select(taskListsSelector);
    const notifications: NotificationType[] = yield select(
      notificationsSelector,
    );
    const taskList = taskListsArr.find(
      (taskList) => taskList.id === action.payload.taskListId,
    );
    const findNotificationItem = (taskID: string) => {
      return notifications.find((item) => item.taskID === taskID);
    };

    if (taskList && taskList.tasks) {
      const notificationTaskIDs: string[] = [];
      taskList.tasks.forEach((task) => {
        notificationTaskIDs.push(task.id);
        const notificationItem = findNotificationItem(task.id);

        if (notificationItem && notificationItem.notificationID) {
          cancelNotificationHelper(notificationItem.notificationID);
        }
      });

      yield put(setTasksNotificationsAction({notificationTaskIDs}));
    }

    yield put(
      deleteTaskListFullAction({
        taskListId: action.payload.taskListId,
      }),
    );
    yield call(action.payload.setIsLoading, false);
    yield call(action.payload.setModalVisible, false);
  } catch (error) {
    yield call(action.payload.setIsLoading, false);
    errorAlert(error);
  }
}
