import { ONLINE } from '@constants/constants';
import { FIREBASE_PATH } from '@enums/firebaseEnum';
import { checkInternetConnectionHelper } from '@helpers/checkInternetConnectionHelper';
import { DB } from '@root/api/DB';
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
  TaskListBeforeConvertType,
  TaskListType,
  TaskListWithoutTasksType,
} from '@store/reducers/tasksReducer/types';
import { SnapshotType, UserIDType } from '@store/reducers/userReducer/types';
import { userIDSelector } from '@store/selectors/userSelectors';
import { darkTheme, lightTheme } from '@themes/themes';
import { call, cancel, put, select } from 'redux-saga/effects';

export function* syncUserDataSaga() {
  const { USERS } = FIREBASE_PATH;

  try {
    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      yield put(setModalMessageAction({ modalMessage: internetConnectionStatus }));

      yield cancel();
    }

    yield put(setGlobalLoaderAction({ globalLoader: true }));

    const userID: UserIDType = yield select(userIDSelector);

    const snapshot: SnapshotType = yield DB.ref(`${USERS}/${userID}`).once('value');

    const userData = snapshot.val() && snapshot.val();
    const theme = userData.darkMode ? darkTheme : lightTheme;

    yield put(setLanguageAction({ language: userData.language }));

    yield put(
      setAccentColorAction({
        accentColor: userData.accentColor,
      }),
    );

    yield put(setThemeAction({ theme }));

    const setTextSizesCondition = !!(
      userData.textSizes &&
      typeof userData.textSizes.modalButtonTextSize === 'number' &&
      typeof userData.textSizes.modalWindowTextSize === 'number' &&
      typeof userData.textSizes.taskListTitleSize === 'number' &&
      typeof userData.textSizes.taskTextSize === 'number' &&
      typeof userData.textSizes.notepadTextSize === 'number'
    );

    if (setTextSizesCondition) {
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
      const userTaskListsObject = snapshot.val().taskLists;
      // convert taskLists object to taskLists array
      const userTaskListsBeforeConvert: TaskListBeforeConvertType[] =
        Object.values(userTaskListsObject);
      // convert tasks object in every taskLists to tasks array in every taskLists
      const taskLists: TaskListType[] = userTaskListsBeforeConvert.map((taskList) => {
        const { tasks } = taskList;

        if (tasks) {
          const taskListWithTasksAsArray: TaskListType = {
            ...taskList,
            tasks: Object.values(tasks),
          };

          return taskListWithTasksAsArray;
        } else {
          const oldTaskList: TaskListWithoutTasksType = { ...taskList };

          return oldTaskList;
        }
      });

      yield put(setTaskListsAction({ taskLists }));
    } else {
      yield put(setTaskListsAction({ taskLists: [] }));
      yield put(setNotificationsAction({ notifications: [] }));
    }

    if (userData.notepad && userData.notepad.notepadText) {
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
