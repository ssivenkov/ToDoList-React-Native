import {
  NOTIFICATION_ID_MAX_LENGTH,
  ONLINE,
  START_ANIMATION_DELAY,
} from '@constants/constants';
import { FIREBASE_PATH } from '@enums/firebaseEnum';
import { cancelNotificationHelper } from '@helpers/cancelNotificationHelper';
import { checkInternetConnectionHelper } from '@helpers/checkInternetConnectionHelper';
import { createNotificationHelper } from '@helpers/createNotificationHelper';
import { createFormattedDateHelper } from '@helpers/dateHelpers';
import { generateNumberIDHelper } from '@helpers/generateNumberIDHelper';
import { DB } from '@root/api/DB';
import { FirebaseNotificationType } from '@root/types/firebase/firebaseTypes';
import * as Sentry from '@sentry/react-native';
import { editTaskNotificationAction } from '@store/actions/tasksReducerActions/notificationsActions/editTaskNotificationAction';
import { setEditedTaskAction } from '@store/actions/tasksReducerActions/tasksActions/setEditedTaskAction';
import { closeTaskHorizontalMenuAction } from '@store/actions/tasksSagaActions/tasksSagasActions/closeTaskHorizontalMenuAction';
import { SetEditedTaskActionSagaReturnType } from '@store/actions/tasksSagaActions/tasksSagasActions/setEditedTaskAction';
import { setModalMessageAction } from '@store/actions/userReducerActions/setModalMessageAction';
import { NotificationType, TaskType } from '@store/reducers/tasksReducer/types';
import {
  ChannelIDType,
  ColorType,
  SnapshotType,
  UserIDType,
} from '@store/reducers/userReducer/types';
import { notificationsSelector } from '@store/selectors/tasksSelectors';
import {
  channelIDSelector,
  selectedColorSelector,
  userIDSelector,
} from '@store/selectors/userSelectors';
import { call, cancel, delay, put, select } from 'redux-saga/effects';

const {
  COLOR_MARK,
  IS_TODO,
  TASK_LISTS,
  TASKS,
  TITLE,
  USERS,
  NOTIFICATIONS,
  MODIFICATION_DATE,
} = FIREBASE_PATH;

export function* editTaskSaga(action: SetEditedTaskActionSagaReturnType) {
  const {
    goBack,
    setIsLoading,
    editedTaskTitle,
    setEditedTaskTitle,
    taskID,
    taskListID,
    date,
    shouldCreateNotification,
    colorMark,
    shouldSetColor,
    setColorMark,
  } = action.payload;

  try {
    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      yield put(setModalMessageAction({ modalMessage: internetConnectionStatus }));

      yield cancel();
    }

    yield call(setIsLoading, true);

    yield delay(START_ANIMATION_DELAY);

    const userID: UserIDType = yield select(userIDSelector);
    const channelId: ChannelIDType = yield select(channelIDSelector);
    const selectedColor: ColorType = yield select(selectedColorSelector);
    const notifications: NotificationType[] = yield select(notificationsSelector);

    if (shouldSetColor && selectedColor) {
      const colorMarkSnapshot: SnapshotType = yield DB.ref(
        `${USERS}/${userID}/${TASK_LISTS}/${taskListID}/${TASKS}/${taskID}/${COLOR_MARK}`,
      ).once('value');

      const isColorMarkExist = typeof colorMarkSnapshot.val() === 'string';

      if (isColorMarkExist) {
        const sendTaskColorToFirebase = () => {
          return DB.ref(
            `${USERS}/${userID}/${TASK_LISTS}/${taskListID}/${TASKS}/${taskID}`,
          ).update({ [COLOR_MARK]: colorMark ?? selectedColor });
        };

        yield call(sendTaskColorToFirebase);
      } else {
        const taskSnapshot: SnapshotType = yield DB.ref(
          `${USERS}/${userID}/${TASK_LISTS}/${taskListID}/${TASKS}/${taskID}`,
        ).once('value');

        const modifiedTask: TaskType = {
          ...taskSnapshot.val(),
          [COLOR_MARK]: colorMark ?? selectedColor,
        };

        const sendModifiedTaskToFirebase = () => {
          return DB.ref(
            `${USERS}/${userID}/${TASK_LISTS}/${taskListID}/${TASKS}/${taskID}`,
          ).set(modifiedTask);
        };

        yield call(sendModifiedTaskToFirebase);
      }
    } else {
      const taskSnapshot: SnapshotType = yield DB.ref(
        `${USERS}/${userID}/${TASK_LISTS}/${taskListID}/${TASKS}/${taskID}`,
      ).once('value');

      const modifiedTask: TaskType = { ...taskSnapshot.val() };
      const colorMarkProperty = Object.keys(modifiedTask).find(
        (item) => item === COLOR_MARK,
      );

      if (colorMarkProperty) {
        const taskWithoutColorMark = { ...modifiedTask };

        delete taskWithoutColorMark.colorMark;

        const sendTaskWithoutColorMarkToFirebase = () => {
          return DB.ref(
            `${USERS}/${userID}/${TASK_LISTS}/${taskListID}/${TASKS}/${taskID}`,
          ).set(taskWithoutColorMark);
        };

        yield call(sendTaskWithoutColorMarkToFirebase);
      }
    }

    const sendTaskTitleToFirebase = () => {
      return DB.ref(
        `${USERS}/${userID}/${TASK_LISTS}/${taskListID}/${TASKS}/${taskID}`,
      ).update({ [TITLE]: editedTaskTitle });
    };

    const currentDate = createFormattedDateHelper();

    const sendTaskModificationDateToFirebase = () => {
      return DB.ref(
        `${USERS}/${userID}/${TASK_LISTS}/${taskListID}/${TASKS}/${taskID}`,
      ).update({ [MODIFICATION_DATE]: currentDate });
    };

    yield call(sendTaskTitleToFirebase);
    yield call(sendTaskModificationDateToFirebase);

    const taskNotification = notifications.find((item) => {
      return taskID === item.taskID;
    });
    const notificationID = taskNotification?.notificationID;

    const shouldDeleteNotificationCondition =
      (shouldCreateNotification && notificationID) || !shouldCreateNotification;

    if (shouldDeleteNotificationCondition) {
      const snapshot: SnapshotType = yield DB.ref(
        `${USERS}/${userID}/${NOTIFICATIONS}/${IS_TODO}/${taskListID}/${taskID}`,
      ).once('value');

      const notificationData = snapshot.val();

      if (notificationData) {
        const removeTaskNotificationFromFirebase = () => {
          return DB.ref(
            `${USERS}/${userID}/${NOTIFICATIONS}/${IS_TODO}/${taskListID}/${taskID}`,
          ).remove();
        };

        yield call(removeTaskNotificationFromFirebase);
      }

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

    const shouldCreateNotificationCondition = shouldCreateNotification && date;

    if (shouldCreateNotificationCondition) {
      const notificationID = generateNumberIDHelper(NOTIFICATION_ID_MAX_LENGTH);

      const firebaseNotification: FirebaseNotificationType = {
        date: date.toISOString(),
        notificationID,
        taskTitle: editedTaskTitle,
        taskID,
      };

      const sendTaskNotificationToFirebase = () => {
        return DB.ref(
          `${USERS}/${userID}/${NOTIFICATIONS}/${IS_TODO}/${taskListID}/${taskID}`,
        ).set(firebaseNotification);
      };

      yield call(sendTaskNotificationToFirebase);

      yield call(createNotificationHelper, {
        channelId,
        date,
        notificationID,
        taskTitle: editedTaskTitle,
      });

      yield put(
        editTaskNotificationAction({
          notification: {
            date,
            notificationID,
            taskID,
          },
        }),
      );
    }

    if (shouldSetColor && colorMark) {
      yield put(
        setEditedTaskAction({
          colorMark: colorMark,
          editedTaskTitle,
          taskID,
          taskListID,
          modificationDate: currentDate,
        }),
      );

      yield call(setColorMark, colorMark);
    } else if (shouldSetColor && !colorMark) {
      yield put(
        setEditedTaskAction({
          colorMark: selectedColor,
          editedTaskTitle,
          taskID,
          taskListID,
          modificationDate: currentDate,
        }),
      );

      yield call(setColorMark, selectedColor);
    } else {
      yield put(
        setEditedTaskAction({
          editedTaskTitle,
          taskID,
          taskListID,
          modificationDate: currentDate,
        }),
      );

      yield call(setColorMark, '');
    }

    yield put(closeTaskHorizontalMenuAction());

    yield call(goBack);
    yield call(setEditedTaskTitle, editedTaskTitle);
  } catch (error) {
    if (error instanceof Error) {
      yield call(Sentry.captureException, error);
      yield put(setModalMessageAction({ modalMessage: error.message }));
    }
  }
}
