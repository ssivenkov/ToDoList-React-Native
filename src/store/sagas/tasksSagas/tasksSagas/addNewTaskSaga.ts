import {
  NOTIFICATION_ID_MAX_LENGTH,
  TASK_LISTS,
  TASKS,
  USERS,
} from '@constants/constants';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {DB} from '@root/api/DB';
import {errorAlert} from '@root/helpers/alertHelper';
import {createNotificationHelper} from '@root/helpers/createNotificationHelper';
import {delayHelper} from '@root/helpers/delayHelper';
import {generateRandomNumberHelper} from '@root/helpers/generateRandomNumberHelper';
import {addTaskNotificationAction} from '@store/actions/tasksReducerActions/notificationsActions/addTaskNotificationAction';
import {addNewTaskAction} from '@store/actions/tasksReducerActions/tasksActions/addNewTaskAction';
import {
  AddNewTaskSagaActionReturnType,
  AddNewTaskSagaPayloadType,
} from '@store/actions/tasksSagaActions/tasksSagasActions/addNewTaskAction';
import {ChannelIDType, UserIDType} from '@store/reducers/authReducer/types';
import {getChannelID, getUserID} from '@store/selectors/authSelectors';
import {t} from 'i18next';
import {call, put, select} from 'redux-saga/effects';

export function* addNewTaskSaga(action: AddNewTaskSagaActionReturnType) {
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
    const notificationID = generateRandomNumberHelper(
      NOTIFICATION_ID_MAX_LENGTH,
    ).toString();
    const addNewTaskToFirebase = (payload: AddNewTaskSagaPayloadType) => {
      return DB.ref(
        `${USERS}/${userID}/${TASK_LISTS}/${payload.taskListId}/${TASKS}/${payload.newTask.id}`,
      ).set(payload.newTask);
    };
    yield call(addNewTaskToFirebase, action.payload);

    if (action.payload.shouldCreateNotification && action.payload.date) {
      yield call(createNotificationHelper, {
        channelId,
        date: action.payload.date,
        notificationID,
        taskTitle: action.payload.newTask.title,
      });

      yield put(
        addTaskNotificationAction({
          notification: {
            taskID: action.payload.newTask.id,
            notificationID,
            date: action.payload.date,
          },
        }),
      );
    } else {
      yield put(
        addTaskNotificationAction({
          notification: {
            taskID: action.payload.newTask.id,
          },
        }),
      );
    }

    yield put(
      addNewTaskAction({
        taskListId: action.payload.taskListId,
        modifiedTaskList: action.payload.modifiedTaskList,
      }),
    );
    yield call(action.payload.setIsLoading, false);
    yield call(action.payload.setModalVisible, false);
    yield call(action.payload.setIsOn, false);
    yield call(action.payload.setNewTaskTitle, '');
  } catch (error) {
    yield call(action.payload.setIsLoading, false);
    errorAlert(error);
  }
}
