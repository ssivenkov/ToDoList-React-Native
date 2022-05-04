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
import {getUserID} from '@store/selectors/authSelectors';
import {put, select} from 'redux-saga/effects';

export function* syncUserTaskListsSaga() {
  try {
    const userID: UserIDType = yield select(getUserID);
    const snapshot: SnapshotType = yield DB.ref(`${USERS}/${userID}`).once(
      'value',
    );
    const hasTaskLists = !!Object.keys(snapshot.val()?.taskLists).length;

    if (hasTaskLists) {
      const userTaskListsObject = snapshot.val().taskLists;
      // convert taskLists object to taskLists array
      const userTaskListsBeforeConvert: TaskListBeforeConvertInterface[] =
        Object.values(userTaskListsObject);
      // convert tasks object in every taskLists to tasks array in every taskLists
      const taskLists: TaskListInterface[] = userTaskListsBeforeConvert.map(
        (taskList) => {
          if (taskList.tasks) {
            const taskListWithTasksAsArray: TaskListInterface = {
              ...taskList,
              tasks: Object.values(taskList.tasks),
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
