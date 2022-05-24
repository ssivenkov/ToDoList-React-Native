import {START_ANIMATION_DELAY, TASK_LISTS, USERS} from '@constants/constants';
import {DB} from '@root/api/DB';
import {errorAlert} from '@root/helpers/alertHelper';
import {cancelNotificationHelper} from '@root/helpers/cancelNotificationHelper';
import {findNotification} from '@root/helpers/findNotification';
import {checkInternetConnectionHelper} from '@root/helpers/hasInternetConnectionHelper';
import {setNotificationsAction} from '@store/actions/tasksReducerActions/notificationsActions/setNotificationsAction';
import {deleteTaskListFullAction} from '@store/actions/tasksReducerActions/taskListsActions/deleteTaskListFullAction';
import {DeleteTaskListFullSagaActionReturnType} from '@store/actions/tasksSagaActions/taskListsSagasActions/deleteTaskListFullAction';
import {
  NotificationType,
  TaskListInterface,
} from '@store/reducers/tasksReducer/types';
import {UserIDType} from '@store/reducers/userReducer/types';
import {
  notificationsSelector,
  taskListsSelector,
} from '@store/selectors/tasksSelectors';
import {userIDSelector} from '@store/selectors/userSelectors';
import {call, delay, put, select} from 'redux-saga/effects';

export function* deleteTaskListFullSaga(
  action: DeleteTaskListFullSagaActionReturnType,
) {
  const {setIsLoading, setModalVisible, taskListID} = action.payload;
  try {
    const internetIsOn: boolean = yield call(checkInternetConnectionHelper);
    if (!internetIsOn) return;

    yield call(setIsLoading, true);
    yield delay(START_ANIMATION_DELAY);
    const userID: UserIDType = yield select(userIDSelector);
    const notifications: NotificationType[] = yield select(
      notificationsSelector,
    );
    const taskLists: TaskListInterface[] = yield select(taskListsSelector);
    const taskList = taskLists.find((taskList) => taskList.id === taskListID);

    const deleteTaskListInFirebase = () => {
      return DB.ref(`${USERS}/${userID}/${TASK_LISTS}/${taskListID}`).remove();
    };

    yield call(deleteTaskListInFirebase);

    if (taskList && taskList.tasks) {
      const {tasks} = taskList;
      const notificationTaskIDs: string[] = [];

      tasks.forEach((task) => {
        const {id: taskID} = task;
        const notificationItem = findNotification(taskID, notifications);
        const notificationID = notificationItem?.notificationID;

        notificationTaskIDs.push(taskID);

        if (notificationID) cancelNotificationHelper(notificationID);
      });

      const filteredNotifications = notifications.filter((notification) => {
        const notificationToDelete =
          notificationTaskIDs.join(',').indexOf(notification.taskID) > -1;

        if (!notificationToDelete) return true;
      });

      yield put(setNotificationsAction({notifications: filteredNotifications}));
    }

    yield put(
      deleteTaskListFullAction({
        taskListID,
      }),
    );
    yield call(setIsLoading, false);
    yield call(setModalVisible, false);
  } catch (error) {
    yield call(setIsLoading, false);
    errorAlert(error);
  }
}
