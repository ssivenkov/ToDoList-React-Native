import { ONLINE, USERS } from '@constants/constants';
import { DB } from '@root/api/DB';
import { checkInternetConnectionHelper } from '@root/helpers/checkInternetConnectionHelper';
import { darkTheme, lightTheme } from '@root/themes/theme';
import { setNotificationsAction } from '@store/actions/tasksReducerActions/notificationsActions/setNotificationsAction';
import { setTaskListsAction } from '@store/actions/tasksReducerActions/taskListsActions/setTaskListsAction';
import { setAccentColorAction } from '@store/actions/userReducerActions/setAccentColorAction';
import { setGlobalLoaderAction } from '@store/actions/userReducerActions/setGlobalLoaderAction';
import { setIsUserDataSynchronizedAction } from '@store/actions/userReducerActions/setIsUserDataSynchronized';
import { setLanguageAction } from '@store/actions/userReducerActions/setLanguageAction';
import { setModalErrorMessageAction } from '@store/actions/userReducerActions/setModalErrorMessageAction';
import { setThemeAction } from '@store/actions/userReducerActions/setThemeAction';
import {
  TaskListBeforeConvertInterface,
  TaskListInterface,
  TaskListWithoutTasksType,
} from '@store/reducers/tasksReducer/types';
import { SnapshotType, UserIDType } from '@store/reducers/userReducer/types';
import { userIDSelector } from '@store/selectors/userSelectors';
import { call, put, select } from 'redux-saga/effects';

export function* syncUserDataSaga() {
  try {
    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      throw Error(internetConnectionStatus);
    }

    yield put(setGlobalLoaderAction({ globalLoader: true }));

    const userID: UserIDType = yield select(userIDSelector);
    const snapshot: SnapshotType = yield DB.ref(`${USERS}/${userID}`).once('value');
    const userData = snapshot.val() && snapshot.val();

    yield put(setLanguageAction({ language: userData.language }));
    yield put(
      setAccentColorAction({
        accentColor: userData.accentColor,
      }),
    );
    const theme = userData.darkMode ? darkTheme : lightTheme;

    yield put(setThemeAction({ theme }));

    if (userData.taskLists) {
      const userTaskListsObject = snapshot.val().taskLists;
      // convert taskLists object to taskLists array
      const userTaskListsBeforeConvert: TaskListBeforeConvertInterface[] =
        Object.values(userTaskListsObject);
      // convert tasks object in every taskLists to tasks array in every taskLists
      const taskLists: TaskListInterface[] = userTaskListsBeforeConvert.map(
        (taskList) => {
          const { tasks } = taskList;

          if (tasks) {
            const taskListWithTasksAsArray: TaskListInterface = {
              ...taskList,
              tasks: Object.values(tasks),
            };

            return taskListWithTasksAsArray;
          } else {
            const oldTaskList: TaskListWithoutTasksType = { ...taskList };

            return oldTaskList;
          }
        },
      );

      yield put(setTaskListsAction({ taskLists }));
    } else {
      yield put(setTaskListsAction({ taskLists: [] }));
      yield put(setNotificationsAction({ notifications: [] }));
    }

    yield put(setIsUserDataSynchronizedAction({ isUserDataSynchronized: true }));
    yield put(setGlobalLoaderAction({ globalLoader: false }));
  } catch (error) {
    yield put(setGlobalLoaderAction({ globalLoader: false }));

    if (error instanceof Error) {
      yield put(setModalErrorMessageAction({ errorModalMessage: error.message }));
    }
  }
}
