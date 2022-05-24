import {
  NOTIFICATION_ID_MAX_LENGTH,
  START_ANIMATION_DELAY,
  TASK_LISTS,
  TASKS,
  USERS,
} from '@constants/constants';
import {DB} from '@root/api/DB';
import {errorAlert} from '@root/helpers/alertHelper';
import {cancelNotificationHelper} from '@root/helpers/cancelNotificationHelper';
import {createNotificationHelper} from '@root/helpers/createNotificationHelper';
import {generateNumberIDHelper} from '@root/helpers/generateNumberIDHelper';
import {checkInternetConnectionHelper} from '@root/helpers/hasInternetConnectionHelper';
import {editTaskNotificationAction} from '@store/actions/tasksReducerActions/notificationsActions/editTaskNotificationAction';
import {setEditedTaskAction} from '@store/actions/tasksReducerActions/tasksActions/setEditedTaskAction';
import {SetEditedTaskActionSagaReturnType} from '@store/actions/tasksSagaActions/tasksSagasActions/setEditedTaskAction';
import {NotificationType} from '@store/reducers/tasksReducer/types';
import {ChannelIDType, UserIDType} from '@store/reducers/userReducer/types';
import {notificationsSelector} from '@store/selectors/tasksSelectors';
import {
  channelIDSelector,
  userIDSelector,
} from '@store/selectors/userSelectors';
import {call, delay, put, select} from 'redux-saga/effects';

export function* editTaskSaga(action: SetEditedTaskActionSagaReturnType) {
  const {
    setIsLoading,
    setModalVisible,
    editedTaskTitle,
    setEditedTaskTitle,
    taskID,
    taskListID,
    date,
    shouldCreateNotification,
  } = action.payload;
  try {
    const internetIsOn: boolean = yield call(checkInternetConnectionHelper);
    if (!internetIsOn) return;

    yield call(setIsLoading, true);
    yield delay(START_ANIMATION_DELAY);
    const userID: UserIDType = yield select(userIDSelector);
    const channelId: ChannelIDType = yield select(channelIDSelector);
    const editTaskTitleInFirebase = () => {
      return DB.ref(
        `${USERS}/${userID}/${TASK_LISTS}/${taskListID}/${TASKS}/${taskID}`,
      ).update({title: editedTaskTitle});
    };
    yield call(editTaskTitleInFirebase);

    if (shouldCreateNotification && date) {
      const notificationID = generateNumberIDHelper(NOTIFICATION_ID_MAX_LENGTH);

      yield call(createNotificationHelper, {
        channelId,
        date,
        notificationID,
        taskTitle: editedTaskTitle,
      });

      yield put(
        editTaskNotificationAction({
          notification: {
            taskID,
            notificationID,
            date,
          },
        }),
      );
    } else {
      const notifications: NotificationType[] = yield select(
        notificationsSelector,
      );

      const taskNotification = notifications.find((item) => {
        return taskID === item.taskID;
      });
      const notificationID = taskNotification?.notificationID;

      if (taskNotification && notificationID) {
        cancelNotificationHelper(notificationID);
      }

      yield put(
        editTaskNotificationAction({
          notification: {
            taskID,
          },
        }),
      );
    }

    yield put(
      setEditedTaskAction({
        taskListID,
        taskID,
        editedTaskTitle,
      }),
    );
    yield call(setIsLoading, false);
    yield call(setModalVisible, false);
    yield call(setEditedTaskTitle, editedTaskTitle);
  } catch (error) {
    yield call(setIsLoading, false);
    errorAlert(error);
  }
}
