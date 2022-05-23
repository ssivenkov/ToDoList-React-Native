import {TASK_LISTS, TASKS, USERS} from '@constants/constants';
import {DB} from '@root/api/DB';
import {errorAlert} from '@root/helpers/alertHelper';
import {cancelNotificationHelper} from '@root/helpers/cancelNotificationHelper';
import {findNotification} from '@root/helpers/findNotification';
import {checkInternetConnectionHelper} from '@root/helpers/hasInternetConnectionHelper';
import {setNotificationsAction} from '@store/actions/tasksReducerActions/notificationsActions/setNotificationsAction';
import {deleteTaskListFromScreenAction} from '@store/actions/tasksReducerActions/taskListsActions/deleteTaskListFromScreenAction';
import {DeleteTaskListFromScreenSagaActionReturnType} from '@store/actions/tasksSagaActions/taskListsSagasActions/deleteTaskListFromScreenAction';
import {UserIDType} from '@store/reducers/authReducer/types';
import {
  ConvertedTasksForFirebaseType,
  NotificationType,
} from '@store/reducers/tasksReducer/types';
import {userIDSelector} from '@store/selectors/authSelectors';
import {notificationsSelector} from '@store/selectors/tasksSelectors';
import {call, delay, put, select} from 'redux-saga/effects';

export function* deleteTaskListFromScreenSaga(
  action: DeleteTaskListFromScreenSagaActionReturnType,
) {
  const {
    setIsLoading,
    fullTaskList,
    deleteTodoTask,
    deleteDoneTask,
    setModalVisible,
  } = action.payload;
  try {
    const internetIsOn: boolean = yield call(checkInternetConnectionHelper);
    if (!internetIsOn) return;

    yield delay(10);
    yield call(setIsLoading, true);
    const userID: UserIDType = yield select(userIDSelector);
    const notifications: NotificationType[] = yield select(
      notificationsSelector,
    );
    const notificationTaskIDs: string[] = [];

    const deleteTaskListFromScreenInFirebase = () => {
      const taskList = {...fullTaskList};
      const {tasks, id: taskListID} = taskList;

      if (deleteTodoTask) {
        DB.ref(`${USERS}/${userID}/${TASK_LISTS}/${taskListID}`).update({
          showInToDo: false,
        });

        if (tasks && tasks.length > 0) {
          tasks.forEach((task) => {
            const {isDone, id: taskID} = task;
            const notificationItem = findNotification(taskID, notifications);
            const notificationID = notificationItem?.notificationID;

            if (!isDone) notificationTaskIDs.push(taskID);

            if (notificationID) cancelNotificationHelper(notificationID);
          });

          taskList.tasks = tasks.filter((task) => task.isDone);
        }
      }

      if (deleteDoneTask && tasks && tasks.length > 0) {
        taskList.tasks = tasks.filter((task) => !task.isDone);
      }

      if (taskList.tasks && taskList.tasks.length > 0) {
        const convertedTasksForFirebase: ConvertedTasksForFirebaseType =
          taskList.tasks.reduce((acc: ConvertedTasksForFirebaseType, task) => {
            return {
              ...acc,
              [task.id]: task,
            };
          }, {});

        return DB.ref(
          `${USERS}/${userID}/${TASK_LISTS}/${taskListID}/${TASKS}`,
        ).set(convertedTasksForFirebase);
      }
    };

    yield call(deleteTaskListFromScreenInFirebase);

    const filteredNotifications = notifications.filter((notification) => {
      const notificationToDelete =
        notificationTaskIDs.join(',').indexOf(notification.taskID) > -1;

      if (!notificationToDelete) return true;
    });

    yield put(setNotificationsAction({notifications: filteredNotifications}));
    yield put(
      deleteTaskListFromScreenAction({
        deleteTodoTask,
        deleteDoneTask,
        fullTaskList,
      }),
    );
    yield call(setIsLoading, false);
    yield call(setModalVisible, false);
  } catch (error) {
    yield call(setIsLoading, false);
    errorAlert(error);
  }
}
