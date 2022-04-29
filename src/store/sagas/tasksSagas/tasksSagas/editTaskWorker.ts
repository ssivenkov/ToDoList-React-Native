import {
  notificationIdMaxLength,
  taskLists,
  tasks,
  Users,
} from '@constants/constants';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {DB} from '@root/api/DB';
import {errorAlert} from '@root/helpers/alert';
import {cancelNotification} from '@root/helpers/cancelNotification';
import {createNotification} from '@root/helpers/createNotification';
import {delay} from '@root/helpers/delay';
import {generateRandomNumber} from '@root/helpers/generateRandomNumber';
import {editTaskNotification} from '@store/actions/tasksReducerActions/notificationsActions/editTaskNotification';
import {setEditedTask} from '@store/actions/tasksReducerActions/tasksActions/setEditedTask';
import {
  SetEditedTaskActionSagaReturnType,
  SetEditedTaskSagaPayloadType,
} from '@store/actions/tasksSagaActions/tasksSagasActions/setEditedTask';
import {UserIDType} from '@store/reducers/authReducer/types';
import {NotificationType} from '@store/reducers/tasksReducer/types';
import {getChannelID, getUserID} from '@store/selectors/authSelectors';
import {getNotifications} from '@store/selectors/tasksSelectors';
import {t} from 'i18next';
import {call, put, select} from 'redux-saga/effects';

export function* editTaskWorker(action: SetEditedTaskActionSagaReturnType) {
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();
    if (!connectionStatus.isInternetReachable) {
      errorAlert(t('common.NoInternetConnection'));
      return;
    }
    yield call(delay, 10);

    yield call(action.payload.setIsLoading, true);
    const userID: UserIDType = yield select(getUserID);
    const channelId: string = yield select(getChannelID);
    const editTaskTitleInFirebase = (payload: SetEditedTaskSagaPayloadType) => {
      return DB.ref(
        `${Users}/${userID}/${taskLists}/${payload.taskListId}/${tasks}/${payload.taskId}`,
      ).update({title: payload.editedTaskTitle});
    };
    yield call(editTaskTitleInFirebase, action.payload);

    if (action.payload.shouldCreateNotification && action.payload.date) {
      const notificationID = generateRandomNumber(
        notificationIdMaxLength,
      ).toString();

      yield call(
        createNotification,
        channelId,
        action.payload.date,
        notificationID,
        action.payload.editedTaskTitle,
      );

      yield put(
        editTaskNotification({
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
        cancelNotification(taskNotification.notificationID);
      }

      yield put(
        editTaskNotification({
          notification: {
            taskID: action.payload.taskId,
          },
        }),
      );
    }

    yield put(
      setEditedTask({
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
