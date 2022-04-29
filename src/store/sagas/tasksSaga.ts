import {
  notificationIdMaxLength,
  taskLists,
  tasks,
  Users,
} from '@constants/constants';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {DB} from '@root/api/DB';
import {errorAlert} from '@root/helpers/alert';
import {cancelNotification} from '@root/helpers/cancelNotification';
import {createNotification} from '@root/helpers/createNotification';
import {delay} from '@root/helpers/delay';
import {generateRandomNumber} from '@root/helpers/generateRandomNumber';
import {addTaskNotification} from '@store/actions/tasksReducerActions/notificationsActions/addTaskNotification';
import {deleteTaskNotification} from '@store/actions/tasksReducerActions/notificationsActions/deleteTaskNotification';
import {editTaskNotification} from '@store/actions/tasksReducerActions/notificationsActions/editTaskNotification';
import {setTasksNotifications} from '@store/actions/tasksReducerActions/notificationsActions/setTasksNotifications';
import {addNewTaskList} from '@store/actions/tasksReducerActions/taskListsActions/addNewTaskList';
import {deleteTaskListFromScreen} from '@store/actions/tasksReducerActions/taskListsActions/deleteTaskListFromScreen';
import {deleteTaskListFull} from '@store/actions/tasksReducerActions/taskListsActions/deleteTaskListFull';
import {setEditedTaskListTitle} from '@store/actions/tasksReducerActions/taskListsActions/setEditedTaskListTitle';
import {addNewTask} from '@store/actions/tasksReducerActions/tasksActions/addNewTask';
import {deleteTask} from '@store/actions/tasksReducerActions/tasksActions/deleteTask';
import {setEditedTask} from '@store/actions/tasksReducerActions/tasksActions/setEditedTask';
import {setTaskIsDone} from '@store/actions/tasksReducerActions/tasksActions/setTaskIsDone';
import {AddNewTaskListSagaActionReturnType} from '@store/actions/tasksSagaActions/taskListsSagasActions/addNewTaskList';
import {
  DeleteTaskListFromScreenSagaActionReturnType,
  DeleteTaskListFromScreenSagaPayloadType,
} from '@store/actions/tasksSagaActions/taskListsSagasActions/deleteTaskListFromScreen';
import {
  DeleteTaskListFullSagaActionReturnType,
  DeleteTaskListFullSagaPayloadType,
} from '@store/actions/tasksSagaActions/taskListsSagasActions/deleteTaskListFull';
import {
  EditTaskListTitleSagaActionReturnType,
  EditTaskListTitleSagaPayloadType,
} from '@store/actions/tasksSagaActions/taskListsSagasActions/editTaskListTitle';
import {
  AddNewTaskSagaActionReturnType,
  AddNewTaskSagaPayloadType,
} from '@store/actions/tasksSagaActions/tasksSagasActions/addNewTask';
import {
  DeleteTaskSagaActionReturnType,
  DeleteTaskSagaPayloadType,
} from '@store/actions/tasksSagaActions/tasksSagasActions/deleteTask';
import {
  SetEditedTaskActionSagaReturnType,
  SetEditedTaskSagaPayloadType,
} from '@store/actions/tasksSagaActions/tasksSagasActions/setEditedTask';
import {
  SetTaskIsDoneSagaActionReturnType,
  SetTaskIsDoneSagaPayloadType,
} from '@store/actions/tasksSagaActions/tasksSagasActions/setTaskIsDone';
import {UserIDType} from '@store/reducers/authReducer/types';
import {
  ConvertedTasksForFirebaseType,
  NotificationType,
  TaskListInterface,
} from '@store/reducers/tasksReducer/types';
import {getChannelID, getUserID} from '@store/selectors/authSelectors';
import {getNotifications, getTaskLists} from '@store/selectors/tasksSelectors';
import {t} from 'i18next';
import {call, put, select} from 'redux-saga/effects';

export function* addNewTaskListWorker(
  action: AddNewTaskListSagaActionReturnType,
) {
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();
    if (!connectionStatus.isInternetReachable) {
      errorAlert(t('common.NoInternetConnection'));
      return;
    }
    yield call(delay, 10);

    yield call(action.payload.setIsLoading, true);
    const userID: UserIDType = yield select(getUserID);
    const addNewTaskListToFirebase = (newTaskList: TaskListInterface) => {
      return DB.ref(`${Users}/${userID}/${taskLists}/${newTaskList.id}`).set(
        newTaskList,
      );
    };

    yield call(addNewTaskListToFirebase, action.payload.newTaskList);
    yield put(addNewTaskList({taskList: action.payload.newTaskList}));
    yield call(action.payload.setIsLoading, false);
    yield call(action.payload.setModalVisible, false);
    yield call(action.payload.setNewTaskListTitle, '');
  } catch (error) {
    yield call(action.payload.setIsLoading, false);
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}

export function* addNewTaskWorker(action: AddNewTaskSagaActionReturnType) {
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();
    if (!connectionStatus.isInternetReachable) {
      errorAlert(t('common.NoInternetConnection'));
      return;
    }
    yield call(delay, 10);

    yield call(action.payload.setIsLoading, true);
    const userID: UserIDType = yield select(getUserID);
    const channelId: string = yield select(getChannelID);
    const notificationID = generateRandomNumber(
      notificationIdMaxLength,
    ).toString();
    const addNewTaskToFirebase = (payload: AddNewTaskSagaPayloadType) => {
      return DB.ref(
        `${Users}/${userID}/${taskLists}/${payload.taskListId}/${tasks}/${payload.newTask.id}`,
      ).set(payload.newTask);
    };
    yield call(addNewTaskToFirebase, action.payload);

    if (action.payload.shouldCreateNotification && action.payload.date) {
      yield call(
        createNotification,
        channelId,
        action.payload.date,
        notificationID,
        action.payload.newTask.title,
      );

      yield put(
        addTaskNotification({
          notification: {
            taskID: action.payload.newTask.id,
            notificationID,
            date: action.payload.date,
          },
        }),
      );
    } else {
      yield put(
        addTaskNotification({
          notification: {
            taskID: action.payload.newTask.id,
          },
        }),
      );
    }

    yield put(
      addNewTask({
        taskListId: action.payload.taskListId,
        modifiedTaskList: action.payload.modifiedTaskList,
      }),
    );
    yield call(action.payload.setIsLoading, false);
    yield call(action.payload.setModalVisible, false);
    yield call(action.payload.setIsOn, false);
    yield call(action.payload.setNewTaskTitle, '');
  } catch (error) {
    yield call(action.payload.setIsLoading, false);
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}

export function* editTaskListTitleWorker(
  action: EditTaskListTitleSagaActionReturnType,
) {
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();
    if (!connectionStatus.isInternetReachable) {
      errorAlert(t('common.NoInternetConnection'));
      return;
    }
    yield call(delay, 10);

    yield call(action.payload.setIsLoading, true);
    const userID: UserIDType = yield select(getUserID);
    const sendModifiedTaskListToFirebase = (
      payload: EditTaskListTitleSagaPayloadType,
    ) => {
      return DB.ref(
        `${Users}/${userID}/${taskLists}/${payload.taskListId}`,
      ).update({
        title: payload.editedTaskListTitle,
      });
    };
    yield call(sendModifiedTaskListToFirebase, action.payload);
    yield put(
      setEditedTaskListTitle({
        taskListId: action.payload.taskListId,
        editedTaskListTitle: action.payload.editedTaskListTitle,
      }),
    );
    yield call(action.payload.setIsLoading, false);
    yield call(action.payload.setModalVisible, false);
    yield call(
      action.payload.setEditedTaskListTitleState,
      action.payload.editedTaskListTitle,
    );
  } catch (error) {
    yield call(action.payload.setIsLoading, false);
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}

export function* deleteTaskListFullWorker(
  action: DeleteTaskListFullSagaActionReturnType,
) {
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();
    if (!connectionStatus.isInternetReachable) {
      errorAlert(t('common.NoInternetConnection'));
      return;
    }
    yield call(delay, 10);

    yield call(action.payload.setIsLoading, true);
    const userID: UserIDType = yield select(getUserID);
    const deleteTaskListInFirebase = (
      payload: DeleteTaskListFullSagaPayloadType,
    ): Promise<void> => {
      return DB.ref(
        `${Users}/${userID}/${taskLists}/${payload.taskListId}`,
      ).remove();
    };
    yield call(deleteTaskListInFirebase, action.payload);

    const taskListsArr: TaskListInterface[] = yield select(getTaskLists);
    const notifications: NotificationType[] = yield select(getNotifications);
    const taskList = taskListsArr.find(
      (taskList) => taskList.id === action.payload.taskListId,
    );
    const findNotificationItem = (taskID: string) => {
      return notifications.find((item) => item.taskID === taskID);
    };

    if (taskList && taskList.tasks) {
      const tasksNotifications: string[] = [];
      taskList.tasks.forEach((task) => {
        tasksNotifications.push(task.id);
        const notificationItem = findNotificationItem(task.id);

        if (notificationItem && notificationItem.notificationID) {
          cancelNotification(notificationItem.notificationID);
        }
      });

      yield put(setTasksNotifications({notifications: tasksNotifications}));
    }

    yield put(
      deleteTaskListFull({
        taskListId: action.payload.taskListId,
      }),
    );
    yield call(action.payload.setIsLoading, false);
    yield call(action.payload.setModalVisible, false);
  } catch (error) {
    yield call(action.payload.setIsLoading, false);
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}

export function* deleteTaskListFromScreenWorker(
  action: DeleteTaskListFromScreenSagaActionReturnType,
) {
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();
    if (!connectionStatus.isInternetReachable) {
      errorAlert(t('common.NoInternetConnection'));
      return;
    }
    yield call(delay, 10);

    yield call(action.payload.setIsLoading, true);
    const userID: UserIDType = yield select(getUserID);
    const notifications: NotificationType[] = yield select(getNotifications);
    const findNotificationItem = (taskID: string) => {
      return notifications.find((item) => item.taskID === taskID);
    };

    const tasksNotifications: string[] = [];

    const deleteTaskListFromScreenInFirebase = (
      payload: DeleteTaskListFromScreenSagaPayloadType,
    ) => {
      const modifiedTaskList = {...payload.fullTaskList};

      if (payload.deleteTodoTask) {
        DB.ref(`${Users}/${userID}/${taskLists}/${modifiedTaskList.id}`).update(
          {
            showInToDo: false,
          },
        );

        if (modifiedTaskList.tasks && modifiedTaskList.tasks.length > 0) {
          modifiedTaskList.tasks.forEach((task) => {
            if (!task.isDone) tasksNotifications.push(task.id);

            const notificationItem = findNotificationItem(task.id);

            if (notificationItem && notificationItem.notificationID) {
              cancelNotification(notificationItem.notificationID);
            }
          });

          modifiedTaskList.tasks = modifiedTaskList.tasks.filter(
            (task) => task.isDone,
          );
        }
      }

      if (payload.deleteDoneTask) {
        if (modifiedTaskList.tasks && modifiedTaskList.tasks.length > 0) {
          modifiedTaskList.tasks = modifiedTaskList.tasks.filter(
            (task) => !task.isDone,
          );
        }
      }

      if (modifiedTaskList.tasks && modifiedTaskList.tasks.length > 0) {
        const convertedTasksForFirebase: ConvertedTasksForFirebaseType =
          modifiedTaskList.tasks.reduce(
            (acc: ConvertedTasksForFirebaseType, task) => {
              return {
                ...acc,
                [task.id]: task,
              };
            },
            {},
          );

        return DB.ref(
          `${Users}/${userID}/${taskLists}/${modifiedTaskList.id}/${tasks}`,
        ).set(convertedTasksForFirebase);
      }
    };

    yield call(deleteTaskListFromScreenInFirebase, action.payload);

    yield put(setTasksNotifications({notifications: tasksNotifications}));

    yield put(
      deleteTaskListFromScreen({
        deleteTodoTask: action.payload.deleteTodoTask,
        deleteDoneTask: action.payload.deleteDoneTask,
        fullTaskList: action.payload.fullTaskList,
      }),
    );
    yield call(action.payload.setIsLoading, false);
    yield call(action.payload.setModalVisible, false);
  } catch (error) {
    yield call(action.payload.setIsLoading, false);
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}

export function* setTaskIsDoneWorker(
  action: SetTaskIsDoneSagaActionReturnType,
) {
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();
    if (!connectionStatus.isInternetReachable) {
      errorAlert(t('common.NoInternetConnection'));
      return;
    }
    yield call(delay, 10);

    yield call(action.payload.setIsLoading, true);
    const userID: UserIDType = yield select(getUserID);
    const setTaskIsDoneInFirebase = (payload: SetTaskIsDoneSagaPayloadType) => {
      return DB.ref(
        `${Users}/${userID}/${taskLists}/${payload.taskListId}/${tasks}/${payload.doneTaskId}`,
      ).update({isDone: true});
    };
    yield call(setTaskIsDoneInFirebase, action.payload);

    const notifications: NotificationType[] = yield select(getNotifications);
    const taskNotification = notifications.find((item) => {
      return action.payload.doneTaskId === item.taskID;
    });

    if (taskNotification && taskNotification.notificationID) {
      cancelNotification(taskNotification.notificationID);
    }
    yield put(deleteTaskNotification({taskID: action.payload.doneTaskId}));

    yield put(
      setTaskIsDone({
        doneTaskId: action.payload.doneTaskId,
        taskListId: action.payload.taskListId,
      }),
    );
    yield call(action.payload.setIsLoading, false);
    yield call(action.payload.setModalVisible, false);
  } catch (error) {
    yield call(action.payload.setIsLoading, false);
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}

export function* editTaskWorker(action: SetEditedTaskActionSagaReturnType) {
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();
    if (!connectionStatus.isInternetReachable) {
      errorAlert(t('common.NoInternetConnection'));
      return;
    }
    yield call(delay, 10);

    yield call(action.payload.setIsLoading, true);
    const userID: UserIDType = yield select(getUserID);
    const channelId: string = yield select(getChannelID);
    const editTaskTitleInFirebase = (payload: SetEditedTaskSagaPayloadType) => {
      return DB.ref(
        `${Users}/${userID}/${taskLists}/${payload.taskListId}/${tasks}/${payload.taskId}`,
      ).update({title: payload.editedTaskTitle});
    };
    yield call(editTaskTitleInFirebase, action.payload);

    if (action.payload.shouldCreateNotification && action.payload.date) {
      const notificationID = generateRandomNumber(
        notificationIdMaxLength,
      ).toString();

      yield call(
        createNotification,
        channelId,
        action.payload.date,
        notificationID,
        action.payload.editedTaskTitle,
      );

      yield put(
        editTaskNotification({
          notification: {
            taskID: action.payload.taskId,
            notificationID,
            date: action.payload.date,
          },
        }),
      );
    } else {
      const notifications: NotificationType[] = yield select(getNotifications);

      const taskNotification = notifications.find((item) => {
        return action.payload.taskId === item.taskID;
      });

      if (taskNotification && taskNotification.notificationID) {
        cancelNotification(taskNotification.notificationID);
      }

      yield put(
        editTaskNotification({
          notification: {
            taskID: action.payload.taskId,
          },
        }),
      );
    }

    yield put(
      setEditedTask({
        taskListId: action.payload.taskListId,
        taskId: action.payload.taskId,
        editedTaskTitle: action.payload.editedTaskTitle,
      }),
    );
    yield call(action.payload.setIsLoading, false);
    yield call(action.payload.setModalVisible, false);
    yield call(
      action.payload.setEditedTaskTitle,
      action.payload.editedTaskTitle,
    );
  } catch (error) {
    yield call(action.payload.setIsLoading, false);
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}

export function* deleteTaskWorker(action: DeleteTaskSagaActionReturnType) {
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();
    if (!connectionStatus.isInternetReachable) {
      errorAlert(t('common.NoInternetConnection'));
      return;
    }
    yield call(delay, 10);

    yield call(action.payload.setIsLoading, true);
    const userID: UserIDType = yield select(getUserID);
    const deleteTaskInFirebase = (payload: DeleteTaskSagaPayloadType) => {
      return DB.ref(
        `${Users}/${userID}/${taskLists}/${payload.taskListId}/${tasks}/${payload.taskId}`,
      ).remove();
    };
    yield call(deleteTaskInFirebase, action.payload);

    const notifications: NotificationType[] = yield select(getNotifications);
    const taskNotification = notifications.find((item) => {
      return action.payload.taskId === item.taskID;
    });

    if (taskNotification && taskNotification.notificationID) {
      cancelNotification(taskNotification.notificationID);
    }
    yield put(deleteTaskNotification({taskID: action.payload.taskId}));

    yield put(
      deleteTask({
        taskId: action.payload.taskId,
        taskListId: action.payload.taskListId,
      }),
    );
    yield call(action.payload.setIsLoading, false);
    yield call(action.payload.setModalVisible, false);
  } catch (error) {
    yield call(action.payload.setIsLoading, false);
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}
