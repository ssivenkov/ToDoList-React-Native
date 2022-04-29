import {taskLists, tasks, Users} from '@constants/constants';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {DB} from '@root/api/DB';
import {errorAlert} from '@root/helpers/alert';
import {cancelNotification} from '@root/helpers/cancelNotification';
import {delay} from '@root/helpers/delay';
import {deleteTaskNotification} from '@store/actions/tasksReducerActions/notificationsActions/deleteTaskNotification';
import {deleteTask} from '@store/actions/tasksReducerActions/tasksActions/deleteTask';
import {
  DeleteTaskSagaActionReturnType,
  DeleteTaskSagaPayloadType,
} from '@store/actions/tasksSagaActions/tasksSagasActions/deleteTask';
import {UserIDType} from '@store/reducers/authReducer/types';
import {NotificationType} from '@store/reducers/tasksReducer/types';
import {getUserID} from '@store/selectors/authSelectors';
import {getNotifications} from '@store/selectors/tasksSelectors';
import {t} from 'i18next';
import {call, put, select} from 'redux-saga/effects';

export function* deleteTaskWorker(action: DeleteTaskSagaActionReturnType) {
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();
    if (!connectionStatus.isInternetReachable) {
      errorAlert(t('common.NoInternetConnection'));
      return;
    }
    yield call(delay, 10);

    yield call(action.payload.setIsLoading, true);
    const userID: UserIDType = yield select(getUserID);
    const deleteTaskInFirebase = (payload: DeleteTaskSagaPayloadType) => {
      return DB.ref(
        `${Users}/${userID}/${taskLists}/${payload.taskListId}/${tasks}/${payload.taskId}`,
      ).remove();
    };
    yield call(deleteTaskInFirebase, action.payload);

    const notifications: NotificationType[] = yield select(getNotifications);
    const taskNotification = notifications.find((item) => {
      return action.payload.taskId === item.taskID;
    });

    if (taskNotification && taskNotification.notificationID) {
      cancelNotification(taskNotification.notificationID);
    }
    yield put(deleteTaskNotification({taskID: action.payload.taskId}));

    yield put(
      deleteTask({
        taskId: action.payload.taskId,
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
