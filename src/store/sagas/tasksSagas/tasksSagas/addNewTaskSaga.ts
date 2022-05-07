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
import {generateNumberIDHelper} from '@root/helpers/generateNumberIDHelper';
import {addTaskNotificationAction} from '@store/actions/tasksReducerActions/notificationsActions/addTaskNotificationAction';
import {addNewTaskAction} from '@store/actions/tasksReducerActions/tasksActions/addNewTaskAction';
import {AddNewTaskSagaActionReturnType} from '@store/actions/tasksSagaActions/tasksSagasActions/addNewTaskAction';
import {ChannelIDType, UserIDType} from '@store/reducers/authReducer/types';
import {
  channelIDSelector,
  userIDSelector,
} from '@store/selectors/authSelectors';
import {t} from 'i18next';
import {call, delay, put, select} from 'redux-saga/effects';

export function* addNewTaskSaga(action: AddNewTaskSagaActionReturnType) {
  const {
    setIsLoading,
    setModalVisible,
    setIsOn,
    setNewTaskTitle,
    newTask,
    date,
    modifiedTaskList,
    shouldCreateNotification,
  } = action.payload;
  const {id: taskID, title: taskTitle} = newTask;
  const {id: taskListID} = modifiedTaskList;
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();
    if (!connectionStatus.isInternetReachable) {
      errorAlert(t('common.NoInternetConnection'));
      return;
    }
    yield delay(10);

    yield call(setIsLoading, true);

    const userID: UserIDType = yield select(userIDSelector);
    const channelId: ChannelIDType = yield select(channelIDSelector);
    const notificationID = generateNumberIDHelper(NOTIFICATION_ID_MAX_LENGTH);
    const addNewTaskToFirebase = () => {
      return DB.ref(
        `${USERS}/${userID}/${TASK_LISTS}/${taskListID}/${TASKS}/${taskID}`,
      ).set(newTask);
    };

    yield call(addNewTaskToFirebase);

    if (shouldCreateNotification && date) {
      yield call(createNotificationHelper, {
        channelId,
        date,
        notificationID,
        taskTitle,
      });

      const notification = {
        taskID,
        notificationID,
        date,
        taskTitle,
      };

      yield put(
        addTaskNotificationAction({
          notification,
        }),
      );
    } else {
      const notification = {
        taskID,
      };

      yield put(
        addTaskNotificationAction({
          notification,
        }),
      );
    }

    yield put(
      addNewTaskAction({
        modifiedTaskList,
      }),
    );

    yield call(setIsLoading, false);
    yield call(setModalVisible, false);
    yield call(setIsOn, false);
    yield call(setNewTaskTitle, '');
  } catch (error) {
    yield call(setIsLoading, false);
    errorAlert(error);
  }
}
