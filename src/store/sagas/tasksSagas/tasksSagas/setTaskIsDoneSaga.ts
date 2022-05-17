import {TASK_LISTS, TASKS, USERS} from '@constants/constants';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {DB} from '@root/api/DB';
import {errorAlert} from '@root/helpers/alertHelper';
import {cancelNotificationHelper} from '@root/helpers/cancelNotificationHelper';
import {hasInternetConnectionHelper} from '@root/helpers/hasInternetConnectionHelper';
import {deleteTaskNotificationAction} from '@store/actions/tasksReducerActions/notificationsActions/deleteTaskNotificationAction';
import {setTaskIsDoneAction} from '@store/actions/tasksReducerActions/tasksActions/setTaskIsDoneAction';
import {SetTaskIsDoneSagaActionReturnType} from '@store/actions/tasksSagaActions/tasksSagasActions/setTaskIsDoneAction';
import {UserIDType} from '@store/reducers/authReducer/types';
import {NotificationType} from '@store/reducers/tasksReducer/types';
import {userIDSelector} from '@store/selectors/authSelectors';
import {notificationsSelector} from '@store/selectors/tasksSelectors';
import {t} from 'i18next';
import {call, delay, put, select} from 'redux-saga/effects';

export function* setTaskIsDoneSaga(action: SetTaskIsDoneSagaActionReturnType) {
  const {setIsLoading, setModalVisible, doneTaskID, taskListID} =
    action.payload;
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();
    if (!hasInternetConnectionHelper(connectionStatus)) {
      errorAlert(t('common.NoInternetConnection'));
      return;
    }
    yield delay(10);

    yield call(setIsLoading, true);
    const userID: UserIDType = yield select(userIDSelector);
    const setTaskIsDoneInFirebase = () => {
      return DB.ref(
        `${USERS}/${userID}/${TASK_LISTS}/${taskListID}/${TASKS}/${doneTaskID}`,
      ).update({isDone: true});
    };
    yield call(setTaskIsDoneInFirebase);

    const notifications: NotificationType[] = yield select(
      notificationsSelector,
    );
    const taskNotification = notifications.find((item) => {
      return doneTaskID === item.taskID;
    });
    const notificationID = taskNotification?.notificationID;

    if (taskNotification && notificationID) {
      cancelNotificationHelper(notificationID);
    }
    yield put(deleteTaskNotificationAction({taskID: doneTaskID}));

    yield put(
      setTaskIsDoneAction({
        doneTaskID,
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
