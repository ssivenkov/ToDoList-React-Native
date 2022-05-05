import {USERS} from '@constants/constants';
import {DB} from '@root/api/DB';
import {errorAlert} from '@root/helpers/alertHelper';
import {setNotificationsAction} from '@store/actions/tasksReducerActions/notificationsActions/setNotificationsAction';
import {setTaskListsAction} from '@store/actions/tasksReducerActions/taskListsActions/setTaskListsAction';
import {SnapshotType, UserIDType} from '@store/reducers/authReducer/types';
import {
  TaskListBeforeConvertInterface,
  TaskListInterface,
  TaskListWithTaskType,
} from '@store/reducers/tasksReducer/types';
import {userIDSelector} from '@store/selectors/authSelectors';
import {put, select} from 'redux-saga/effects';

export function* syncUserTaskListsSaga() {
  try {
    const userID: UserIDType = yield select(userIDSelector);
    const snapshot: SnapshotType = yield DB.ref(`${USERS}/${userID}`).once(
      'value',
    );
    const hasTaskLists = snapshot.val() && snapshot.val().taskLists;

    if (hasTaskLists) {
      const userTaskListsObject = snapshot.val().taskLists;
      // convert taskLists object to taskLists array
      const userTaskListsBeforeConvert: TaskListBeforeConvertInterface[] =
        Object.values(userTaskListsObject);
      // convert tasks object in every taskLists to tasks array in every taskLists
      const taskLists: TaskListInterface[] = userTaskListsBeforeConvert.map(
        (taskList) => {
          const {tasks} = taskList;

          if (tasks) {
            const taskListWithTasksAsArray: TaskListInterface = {
              ...taskList,
              tasks: Object.values(tasks),
            };

            return taskListWithTasksAsArray;
          } else {
            const oldTaskList: TaskListWithTaskType = {...taskList};

            return oldTaskList;
          }
        },
      );

      yield put(setTaskListsAction({taskLists}));
    } else {
      yield put(setTaskListsAction({taskLists: []}));
      yield put(setNotificationsAction({notifications: []}));
    }
  } catch (error) {
    errorAlert(error);
  }
}
