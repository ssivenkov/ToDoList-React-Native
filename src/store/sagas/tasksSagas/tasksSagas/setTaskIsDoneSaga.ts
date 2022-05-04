import {TASK_LISTS, TASKS, USERS} from '@constants/constants';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {DB} from '@root/api/DB';
import {errorAlert} from '@root/helpers/alertHelper';
import {cancelNotificationHelper} from '@root/helpers/cancelNotificationHelper';
import {delayHelper} from '@root/helpers/delayHelper';
import {deleteTaskNotificationAction} from '@store/actions/tasksReducerActions/notificationsActions/deleteTaskNotificationAction';
import {setTaskIsDoneAction} from '@store/actions/tasksReducerActions/tasksActions/setTaskIsDoneAction';
import {
  SetTaskIsDoneSagaActionReturnType,
  SetTaskIsDoneSagaPayloadType,
} from '@store/actions/tasksSagaActions/tasksSagasActions/setTaskIsDoneAction';
import {UserIDType} from '@store/reducers/authReducer/types';
import {NotificationType} from '@store/reducers/tasksReducer/types';
import {getUserID} from '@store/selectors/authSelectors';
import {getNotifications} from '@store/selectors/tasksSelectors';
import {t} from 'i18next';
import {call, put, select} from 'redux-saga/effects';

export function* setTaskIsDoneSaga(action: SetTaskIsDoneSagaActionReturnType) {
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();
    if (!connectionStatus.isInternetReachable) {
      errorAlert(t('common.NoInternetConnection'));
      return;
    }
    yield call(delayHelper, 10);

    yield call(action.payload.setIsLoading, true);
    const userID: UserIDType = yield select(getUserID);
    const setTaskIsDoneInFirebase = (payload: SetTaskIsDoneSagaPayloadType) => {
      return DB.ref(
        `${USERS}/${userID}/${TASK_LISTS}/${payload.taskListId}/${TASKS}/${payload.doneTaskId}`,
      ).update({isDone: true});
    };
    yield call(setTaskIsDoneInFirebase, action.payload);

    const notifications: NotificationType[] = yield select(getNotifications);
    const taskNotification = notifications.find((item) => {
      return action.payload.doneTaskId === item.taskID;
    });

    if (taskNotification && taskNotification.notificationID) {
      cancelNotificationHelper(taskNotification.notificationID);
    }
    yield put(
      deleteTaskNotificationAction({taskID: action.payload.doneTaskId}),
    );

    yield put(
      setTaskIsDoneAction({
        doneTaskId: action.payload.doneTaskId,
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
