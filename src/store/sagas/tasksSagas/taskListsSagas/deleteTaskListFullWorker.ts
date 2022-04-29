import {taskLists, Users} from '@constants/constants';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {DB} from '@root/api/DB';
import {errorAlert} from '@root/helpers/alert';
import {cancelNotification} from '@root/helpers/cancelNotification';
import {delay} from '@root/helpers/delay';
import {setTasksNotifications} from '@store/actions/tasksReducerActions/notificationsActions/setTasksNotifications';
import {deleteTaskListFull} from '@store/actions/tasksReducerActions/taskListsActions/deleteTaskListFull';
import {
  DeleteTaskListFullSagaActionReturnType,
  DeleteTaskListFullSagaPayloadType,
} from '@store/actions/tasksSagaActions/taskListsSagasActions/deleteTaskListFull';
import {UserIDType} from '@store/reducers/authReducer/types';
import {
  NotificationType,
  TaskListInterface,
} from '@store/reducers/tasksReducer/types';
import {getUserID} from '@store/selectors/authSelectors';
import {getNotifications, getTaskLists} from '@store/selectors/tasksSelectors';
import {t} from 'i18next';
import {call, put, select} from 'redux-saga/effects';

export function* deleteTaskListFullWorker(
  action: DeleteTaskListFullSagaActionReturnType,
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
    const deleteTaskListInFirebase = (
      payload: DeleteTaskListFullSagaPayloadType,
    ): Promise<void> => {
      return DB.ref(
        `${Users}/${userID}/${taskLists}/${payload.taskListId}`,
      ).remove();
    };
    yield call(deleteTaskListInFirebase, action.payload);

    const taskListsArr: TaskListInterface[] = yield select(getTaskLists);
    const notifications: NotificationType[] = yield select(getNotifications);
    const taskList = taskListsArr.find(
      (taskList) => taskList.id === action.payload.taskListId,
    );
    const findNotificationItem = (taskID: string) => {
      return notifications.find((item) => item.taskID === taskID);
    };

    if (taskList && taskList.tasks) {
      const tasksNotifications: string[] = [];
      taskList.tasks.forEach((task) => {
        tasksNotifications.push(task.id);
        const notificationItem = findNotificationItem(task.id);

        if (notificationItem && notificationItem.notificationID) {
          cancelNotification(notificationItem.notificationID);
        }
      });

      yield put(setTasksNotifications({notifications: tasksNotifications}));
    }

    yield put(
      deleteTaskListFull({
        taskListId: action.payload.taskListId,
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
