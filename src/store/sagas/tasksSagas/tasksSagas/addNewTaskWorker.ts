import {
  notificationIdMaxLength,
  taskLists,
  tasks,
  Users,
} from '@constants/constants';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {DB} from '@root/api/DB';
import {errorAlert} from '@root/helpers/alert';
import {createNotification} from '@root/helpers/createNotification';
import {delay} from '@root/helpers/delay';
import {generateRandomNumber} from '@root/helpers/generateRandomNumber';
import {addTaskNotification} from '@store/actions/tasksReducerActions/notificationsActions/addTaskNotification';
import {addNewTask} from '@store/actions/tasksReducerActions/tasksActions/addNewTask';
import {
  AddNewTaskSagaActionReturnType,
  AddNewTaskSagaPayloadType,
} from '@store/actions/tasksSagaActions/tasksSagasActions/addNewTask';
import {UserIDType} from '@store/reducers/authReducer/types';
import {getChannelID, getUserID} from '@store/selectors/authSelectors';
import {t} from 'i18next';
import {call, put, select} from 'redux-saga/effects';

export function* addNewTaskWorker(action: AddNewTaskSagaActionReturnType) {
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
    const notificationID = generateRandomNumber(
      notificationIdMaxLength,
    ).toString();
    const addNewTaskToFirebase = (payload: AddNewTaskSagaPayloadType) => {
      return DB.ref(
        `${Users}/${userID}/${taskLists}/${payload.taskListId}/${tasks}/${payload.newTask.id}`,
      ).set(payload.newTask);
    };
    yield call(addNewTaskToFirebase, action.payload);

    if (action.payload.shouldCreateNotification && action.payload.date) {
      yield call(
        createNotification,
        channelId,
        action.payload.date,
        notificationID,
        action.payload.newTask.title,
      );

      yield put(
        addTaskNotification({
          notification: {
            taskID: action.payload.newTask.id,
            notificationID,
            date: action.payload.date,
          },
        }),
      );
    } else {
      yield put(
        addTaskNotification({
          notification: {
            taskID: action.payload.newTask.id,
          },
        }),
      );
    }

    yield put(
      addNewTask({
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
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}
