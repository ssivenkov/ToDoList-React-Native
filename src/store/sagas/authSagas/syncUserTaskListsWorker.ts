import {Users} from '@constants/constants';
import {DB} from '@root/api/DB';
import {errorAlert} from '@root/helpers/alert';
import {setNotifications} from '@store/actions/tasksReducerActions/notificationsActions/setNotifications';
import {setTaskLists} from '@store/actions/tasksReducerActions/taskListsActions/setTaskLists';
import {SnapshotType, UserIDType} from '@store/reducers/authReducer/types';
import {
  TaskListBeforeConvertInterface,
  TaskListInterface,
  TaskListWithTaskType,
} from '@store/reducers/tasksReducer/types';
import {getUserID} from '@store/selectors/authSelectors';
import {put, select} from 'redux-saga/effects';

export function* syncUserTaskListsWorker() {
  try {
    const userID: UserIDType = yield select(getUserID);
    const snapshot: SnapshotType = yield DB.ref(`${Users}/${userID}`).once(
      'value',
    );
    const hasTaskLists = Object.keys(snapshot.val()?.taskLists).length > 0;

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

      yield put(setTaskLists({taskLists}));
    } else {
      yield put(setTaskLists({taskLists: []}));
      yield put(setNotifications({notifications: []}));
    }
  } catch (error) {
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}
