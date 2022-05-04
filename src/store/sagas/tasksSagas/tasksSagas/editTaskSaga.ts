import {
  NOTIFICATION_ID_MAX_LENGTH,
  TASK_LISTS,
  TASKS,
  USERS,
} from '@constants/constants';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {DB} from '@root/api/DB';
import {errorAlert} from '@root/helpers/alertHelper';
import {cancelNotificationHelper} from '@root/helpers/cancelNotificationHelper';
import {createNotificationHelper} from '@root/helpers/createNotificationHelper';
import {delayHelper} from '@root/helpers/delayHelper';
import {generateRandomNumberHelper} from '@root/helpers/generateRandomNumberHelper';
import {editTaskNotificationAction} from '@store/actions/tasksReducerActions/notificationsActions/editTaskNotificationAction';
import {setEditedTaskAction} from '@store/actions/tasksReducerActions/tasksActions/setEditedTaskAction';
import {
  SetEditedTaskActionSagaReturnType,
  SetEditedTaskSagaPayloadType,
} from '@store/actions/tasksSagaActions/tasksSagasActions/setEditedTaskAction';
import {ChannelIDType, UserIDType} from '@store/reducers/authReducer/types';
import {NotificationType} from '@store/reducers/tasksReducer/types';
import {getChannelID, getUserID} from '@store/selectors/authSelectors';
import {getNotifications} from '@store/selectors/tasksSelectors';
import {t} from 'i18next';
import {call, put, select} from 'redux-saga/effects';

export function* editTaskSaga(action: SetEditedTaskActionSagaReturnType) {
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();
    if (!connectionStatus.isInternetReachable) {
      errorAlert(t('common.NoInternetConnection'));
      return;
    }
    yield call(delayHelper, 10);

    yield call(action.payload.setIsLoading, true);
    const userID: UserIDType = yield select(getUserID);
    const channelId: ChannelIDType = yield select(getChannelID);
    const editTaskTitleInFirebase = (payload: SetEditedTaskSagaPayloadType) => {
      return DB.ref(
        `${USERS}/${userID}/${TASK_LISTS}/${payload.taskListId}/${TASKS}/${payload.taskId}`,
      ).update({title: payload.editedTaskTitle});
    };
    yield call(editTaskTitleInFirebase, action.payload);

    if (action.payload.shouldCreateNotification && action.payload.date) {
      const notificationID = generateRandomNumberHelper(
        NOTIFICATION_ID_MAX_LENGTH,
      ).toString();

      yield call(createNotificationHelper, {
        channelId,
        date: action.payload.date,
        notificationID,
        taskTitle: action.payload.editedTaskTitle,
      });

      yield put(
        editTaskNotificationAction({
          notification: {
            taskID: action.payload.taskId,
            notificationID,
            date: action.payload.date,
          },
        }),
      );
    } else {
      const notifications: NotificationType[] = yield select(getNotifications);

      const taskNotification = notifications.find((item) => {
        return action.payload.taskId === item.taskID;
      });

      if (taskNotification && taskNotification.notificationID) {
        cancelNotificationHelper(taskNotification.notificationID);
      }

      yield put(
        editTaskNotificationAction({
          notification: {
            taskID: action.payload.taskId,
          },
        }),
      );
    }

    yield put(
      setEditedTaskAction({
        taskListId: action.payload.taskListId,
        taskId: action.payload.taskId,
        editedTaskTitle: action.payload.editedTaskTitle,
      }),
    );
    yield call(action.payload.setIsLoading, false);
    yield call(action.payload.setModalVisible, false);
    yield call(
      action.payload.setEditedTaskTitle,
      action.payload.editedTaskTitle,
    );
  } catch (error) {
    yield call(action.payload.setIsLoading, false);
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}
