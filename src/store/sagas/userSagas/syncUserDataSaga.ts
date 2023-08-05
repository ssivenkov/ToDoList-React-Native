import { ONLINE } from '@constants/constants';
import { FIREBASE_PATH } from '@enums/firebaseEnum';
import { checkInternetConnectionHelper } from '@helpers/checkInternetConnectionHelper';
import { createNotificationHelper } from '@helpers/createNotificationHelper';
import { DB } from '@root/api/DB';
import {
  FirebaseListOfTaskListsNotificationsType,
  FirebaseNotificationType,
  FirebaseUserDataType,
} from '@root/types/firebase/firebaseTypes';
import * as Sentry from '@sentry/react-native';
import { setNotepadTextAction } from '@store/actions/notepadReducerActions/setNotepadTextAction';
import { setNotificationsAction } from '@store/actions/tasksReducerActions/notificationsActions/setNotificationsAction';
import { setTaskListsAction } from '@store/actions/tasksReducerActions/taskListsActions/setTaskListsAction';
import { setAccentColorAction } from '@store/actions/userReducerActions/setAccentColorAction';
import { setGlobalLoaderAction } from '@store/actions/userReducerActions/setGlobalLoaderAction';
import { setIsUserDataSynchronizedAction } from '@store/actions/userReducerActions/setIsUserDataSynchronizedAction';
import { setLanguageAction } from '@store/actions/userReducerActions/setLanguageAction';
import { setModalMessageAction } from '@store/actions/userReducerActions/setModalMessageAction';
import { setTextSizesAction } from '@store/actions/userReducerActions/setTextSizesAction';
import { setThemeAction } from '@store/actions/userReducerActions/setThemeAction';
import {
  TaskListType,
  TaskListWithoutTasksType,
  TasksReducerStateType,
} from '@store/reducers/tasksReducer/types';
import {
  ChannelIDType,
  SnapshotType,
  UserIDType,
} from '@store/reducers/userReducer/types';
import { channelIDSelector, userIDSelector } from '@store/selectors/userSelectors';
import { darkTheme, lightTheme } from '@themes/themes';
import { call, cancel, put, putResolve, select } from 'redux-saga/effects';

const { IS_DONE, IS_TODO, NOTIFICATIONS, USERS } = FIREBASE_PATH;

type DeleteTaskNotificationFromFirebaseParamsType = {
  isTodo: boolean;
  taskID: string;
  taskListID: string;
};

type ExpiredNotificationsDataType = Array<
  Pick<FirebaseNotificationType, 'taskID'> & DeleteTaskNotificationFromFirebaseParamsType
>;

export function* syncUserDataSaga() {
  try {
    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      yield put(setModalMessageAction({ modalMessage: internetConnectionStatus }));

      yield cancel();
    }

    yield put(setGlobalLoaderAction({ globalLoader: true }));

    const userID: UserIDType = yield select(userIDSelector);

    const snapshot: SnapshotType = yield DB.ref(`${USERS}/${userID}`).once('value');

    const userData: FirebaseUserDataType = snapshot.val();
    const theme = userData.darkMode ? darkTheme : lightTheme;

    if (userData.language) {
      yield put(setLanguageAction({ language: userData.language }));
    }

    if (userData.accentColor) {
      yield put(
        setAccentColorAction({
          accentColor: userData.accentColor,
        }),
      );
    }

    yield put(setThemeAction({ theme }));

    if (
      userData.textSizes &&
      userData.textSizes.notepadTextSize &&
      userData.textSizes.taskTextSize &&
      userData.textSizes.taskListTitleSize &&
      userData.textSizes.modalButtonTextSize &&
      userData.textSizes.modalWindowTextSize
    ) {
      yield put(
        setTextSizesAction({
          modalButtonTextSize: userData.textSizes.modalButtonTextSize,
          modalWindowTextSize: userData.textSizes.modalWindowTextSize,
          taskListTitleSize: userData.textSizes.taskListTitleSize,
          taskTextSize: userData.textSizes.taskTextSize,
          notepadTextSize: userData.textSizes.notepadTextSize,
        }),
      );
    }

    if (userData.taskLists) {
      const userTaskListsObject: FirebaseUserDataType['taskLists'] =
        snapshot.val().taskLists;

      if (userTaskListsObject) {
        // convert taskLists object to taskLists array
        const taskListsBeforeConvert = Object.values(userTaskListsObject);

        // convert tasks object in every taskLists to tasks array in every taskLists
        const taskLists: TaskListType[] = taskListsBeforeConvert.map((taskList) => {
          const { tasks } = taskList;

          if (tasks) {
            const taskListWithTasksAsArray: TaskListType = {
              ...taskList,
              tasks: Object.values(tasks),
            };

            return taskListWithTasksAsArray;
          } else {
            const taskListWithoutTasks: TaskListWithoutTasksType = { ...taskList };

            return taskListWithoutTasks;
          }
        });

        yield put(setTaskListsAction({ taskLists }));
      }
    } else {
      yield put(setTaskListsAction({ taskLists: [] }));
      yield put(setNotificationsAction({ notifications: [] }));
    }

    const channelId: ChannelIDType = yield select(channelIDSelector);

    const unexpiredNotificationsData: FirebaseNotificationType[] = [];
    const expiredNotificationsData: ExpiredNotificationsDataType = [];

    if (userData.notifications) {
      const currentDate = new Date();

      const hasNotificationDateNotExpired = (date: FirebaseNotificationType['date']) => {
        const taskDate = new Date(date);

        return taskDate > currentDate;
      };

      const checkNotificationExpiration = (
        listOfTaskListsNotifications:
          | FirebaseListOfTaskListsNotificationsType
          | undefined,
        isTodo: boolean,
      ) => {
        if (!listOfTaskListsNotifications) return;

        const taskListWithNotificationsIDArray = Object.keys(
          listOfTaskListsNotifications,
        );
        const taskListWithNotificationsArray = Object.values(
          listOfTaskListsNotifications,
        );

        for (
          let taskListWithNotificationsIndex = 0;
          taskListWithNotificationsIndex < taskListWithNotificationsArray.length;
          taskListWithNotificationsIndex += 1
        ) {
          for (const notification of Object.values(
            taskListWithNotificationsArray[taskListWithNotificationsIndex],
          )) {
            if (hasNotificationDateNotExpired(notification.date)) {
              unexpiredNotificationsData.push(notification);
            } else {
              const { taskID } = notification;

              expiredNotificationsData.push({
                taskID,
                isTodo,
                taskListID:
                  taskListWithNotificationsIDArray[taskListWithNotificationsIndex],
              });
            }
          }
        }
      };

      checkNotificationExpiration(userData.notifications.isTodo, true);
      checkNotificationExpiration(userData.notifications.isDone, false);
    }

    if (expiredNotificationsData.length > 0) {
      const deleteTaskNotificationFromFirebase = (
        params: DeleteTaskNotificationFromFirebaseParamsType,
      ) => {
        const { isTodo, taskListID, taskID } = params;

        return DB.ref(
          `${USERS}/${userID}/${NOTIFICATIONS}/${
            isTodo ? IS_TODO : IS_DONE
          }/${taskListID}/${taskID}`,
        ).remove();
      };

      for (let index = 0; index < expiredNotificationsData.length; index += 1) {
        const taskID = expiredNotificationsData[index].taskID;
        const taskListID = expiredNotificationsData[index].taskListID;
        const isTodo = expiredNotificationsData[index].isTodo;

        yield call(deleteTaskNotificationFromFirebase, { isTodo, taskListID, taskID });
      }
    }

    if (unexpiredNotificationsData.length > 0) {
      const unexpiredNotifications: TasksReducerStateType['notifications'] = [];

      for (let index = 0; index < unexpiredNotificationsData.length; index += 1) {
        const date = new Date(unexpiredNotificationsData[index].date);
        const notificationID = unexpiredNotificationsData[index].notificationID;
        const taskTitle = unexpiredNotificationsData[index].taskTitle;
        const taskID = unexpiredNotificationsData[index].taskID;

        if (!!date && !!notificationID && !!taskID && !!channelId) {
          yield call(createNotificationHelper, {
            channelId,
            date,
            notificationID,
            taskTitle,
          });

          unexpiredNotifications.push({ date, notificationID, taskID });
        }
      }

      yield putResolve(setNotificationsAction({ notifications: unexpiredNotifications }));
    }

    if (userData.notepad && userData.notepad.notepadText.length > 0) {
      yield put(setNotepadTextAction({ notepadText: userData.notepad.notepadText }));
    }

    yield put(setIsUserDataSynchronizedAction({ isUserDataSynchronized: true }));
  } catch (error) {
    if (error instanceof Error) {
      yield call(Sentry.captureException, error);
      yield put(setModalMessageAction({ modalMessage: error.message }));
    }
  } finally {
    yield put(setGlobalLoaderAction({ globalLoader: false }));
  }
}
