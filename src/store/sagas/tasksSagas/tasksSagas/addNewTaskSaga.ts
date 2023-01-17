import {
  NOTIFICATION_ID_MAX_LENGTH,
  ONLINE,
  START_ANIMATION_DELAY,
} from '@constants/constants';
import { FIREBASE_PATH } from '@enums/firebaseEnum';
import { checkInternetConnectionHelper } from '@helpers/checkInternetConnectionHelper';
import { createNotificationHelper } from '@helpers/createNotificationHelper';
import { generateNumberIDHelper } from '@helpers/generateNumberIDHelper';
import { DB } from '@root/api/DB';
import * as Sentry from '@sentry/react-native';
import { addTaskNotificationAction } from '@store/actions/tasksReducerActions/notificationsActions/addTaskNotificationAction';
import { addNewTaskAction } from '@store/actions/tasksReducerActions/tasksActions/addNewTaskAction';
import { AddNewTaskSagaActionReturnType } from '@store/actions/tasksSagaActions/tasksSagasActions/addNewTaskAction';
import { setModalMessageAction } from '@store/actions/userReducerActions/setModalMessageAction';
import { ChannelIDType, UserIDType } from '@store/reducers/userReducer/types';
import { channelIDSelector, userIDSelector } from '@store/selectors/userSelectors';
import { call, cancel, delay, put, select } from 'redux-saga/effects';

export function* addNewTaskSaga(action: AddNewTaskSagaActionReturnType) {
  const {
    setLoading,
    setButtonDisabled,
    goBack,
    newTask,
    date,
    modifiedTaskList,
    shouldCreateNotification,
  } = action.payload;

  const { id: taskID, title: taskTitle } = newTask;

  const { id: taskListID } = modifiedTaskList;

  const { TASK_LISTS, TASKS, USERS } = FIREBASE_PATH;

  try {
    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      yield put(setModalMessageAction({ modalMessage: internetConnectionStatus }));

      yield cancel();
    }

    yield call(setLoading, true);
    yield call(setButtonDisabled, true);

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

    yield call(goBack);
  } catch (error) {
    if (error instanceof Error) {
      yield call(Sentry.captureException, error);
      yield put(setModalMessageAction({ modalMessage: error.message }));
    }

    yield call(setLoading, false);
    yield call(setButtonDisabled, false);
  }
}
