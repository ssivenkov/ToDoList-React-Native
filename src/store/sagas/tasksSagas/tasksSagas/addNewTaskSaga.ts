import {
  NOTIFICATION_ID_MAX_LENGTH,
  ONLINE,
  START_ANIMATION_DELAY,
  TASK_LISTS,
  TASKS,
  USERS,
} from '@constants/constants';
import { DB } from '@root/api/DB';
import { checkInternetConnectionHelper } from '@root/helpers/checkInternetConnectionHelper';
import { createNotificationHelper } from '@root/helpers/createNotificationHelper';
import { generateNumberIDHelper } from '@root/helpers/generateNumberIDHelper';
import * as Sentry from '@sentry/react-native';
import { addTaskNotificationAction } from '@store/actions/tasksReducerActions/notificationsActions/addTaskNotificationAction';
import { addNewTaskAction } from '@store/actions/tasksReducerActions/tasksActions/addNewTaskAction';
import { AddNewTaskSagaActionReturnType } from '@store/actions/tasksSagaActions/tasksSagasActions/addNewTaskAction';
import { setModalErrorMessageAction } from '@store/actions/userReducerActions/setModalErrorMessageAction';
import { ChannelIDType, UserIDType } from '@store/reducers/userReducer/types';
import { channelIDSelector, userIDSelector } from '@store/selectors/userSelectors';
import { call, cancel, delay, put, select } from 'redux-saga/effects';

export function* addNewTaskSaga(action: AddNewTaskSagaActionReturnType) {
  const {
    setIsLoading,
    setModalVisible,
    setIsNotificationSwitcherOn,
    setNewTaskTitle,
    newTask,
    date,
    modifiedTaskList,
    shouldCreateNotification,
  } = action.payload;
  const { id: taskID, title: taskTitle } = newTask;
  const { id: taskListID } = modifiedTaskList;

  try {
    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      yield put(
        setModalErrorMessageAction({ errorModalMessage: internetConnectionStatus }),
      );

      yield cancel();
    }

    yield call(setIsLoading, true);
    yield delay(START_ANIMATION_DELAY);
    const userID: UserIDType = yield select(userIDSelector);
    const channelId: ChannelIDType = yield select(channelIDSelector);
    const notificationID = generateNumberIDHelper(NOTIFICATION_ID_MAX_LENGTH);
    const sendNewTaskToFirebase = () => {
      return DB.ref(
        `${USERS}/${userID}/${TASK_LISTS}/${taskListID}/${TASKS}/${taskID}`,
      ).set(newTask);
    };

    yield call(sendNewTaskToFirebase);

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

    yield call(setModalVisible, false);
    yield call(setIsNotificationSwitcherOn, false);
    yield call(setNewTaskTitle, '');
  } catch (error) {
    if (error instanceof Error) {
      yield call(Sentry.captureException, error);
      yield put(setModalErrorMessageAction({ errorModalMessage: error.message }));
    }
  } finally {
    yield call(setIsLoading, false);
  }
}
