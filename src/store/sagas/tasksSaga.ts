import {taskLists, tasks, Users} from '@constants/constants';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {FirebaseDatabaseTypes} from '@react-native-firebase/database';
import {errorAlert} from '@root/helpers/Alert';
import {DB} from '@root/helpers/DB';
import {setAuthStatus} from '@store/actions/authActions/authActions';
import {
  addNewTask,
  addNewTaskList,
  deleteTask,
  deleteTaskListFromScreen,
  deleteTaskListFull,
  setEditedTask,
  setEditedTaskListTitle,
  setTaskIsDone,
  setTaskLists,
} from '@store/actions/tasksActions/tasksActions';
import {syncUserTaskLists} from '@store/actions/tasksSagaActions/tasksSagaActions';
import {
  AddNewTaskListSagaActionType,
  AddNewTaskPayloadType,
  AddNewTaskSagaActionType,
  DeleteTaskActionType,
  DeleteTaskListFromScreenActionType,
  DeleteTaskListFromScreenPayloadType,
  DeleteTaskListFullActionType,
  DeleteTaskListFullPayloadType,
  DeleteTaskPayloadType,
  EditTaskListTitleFullActionType,
  EditTaskListTitleFullPayloadType,
  SetEditedTaskActionType,
  SetEditedTaskPayloadType,
  SetTaskIsDoneActionType,
  SetTaskIsDonePayloadType,
} from '@store/actions/tasksSagaActions/types';
import {
  ConvertedTasksForFirebaseType,
  TaskListBeforeConvertInterface,
  TaskListInterface,
  TaskListWithTaskType,
} from '@store/reducers/tasksReducer/types';
import {t} from 'i18next';
import {call, put, select} from 'redux-saga/effects';

export function* checkUserWorker() {
  try {
    const {uid} = yield select((state) => state.auth.userData);
    const snapshot: FirebaseDatabaseTypes.DataSnapshot = yield DB.ref(
      `${Users}/${uid}`,
    ).once('value');
    const isUserExist = snapshot.exists();
    if (!isUserExist) {
      const newUserData = {userToken: uid, taskLists: []};
      yield DB.ref(`${Users}/${uid}`).set(newUserData);
      yield put(setAuthStatus(true));
    } else {
      yield put(syncUserTaskLists());
    }
  } catch (error) {
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}

export function* syncUserTaskListsWorker() {
  try {
    const {uid} = yield select((state) => state.auth.userData);
    const snapshot: FirebaseDatabaseTypes.DataSnapshot = yield DB.ref(
      `${Users}/${uid}`,
    ).once('value');

    if (snapshot.val().taskLists) {
      const userTaskListsObject = snapshot.val().taskLists;
      // convert taskLists object to taskLists array
      const userTaskListsBeforeConvert: TaskListBeforeConvertInterface[] =
        Object.values(userTaskListsObject);
      // convert tasks object in every taskLists to tasks array in every taskLists
      const userTaskLists: TaskListInterface[] = userTaskListsBeforeConvert.map(
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

      yield put(setTaskLists(userTaskLists));
    } else {
      yield put(setTaskLists([]));
    }

    yield put(setAuthStatus(true));
  } catch (error) {
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}

export function* addNewTaskListWorker(action: AddNewTaskListSagaActionType) {
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();
    if (!connectionStatus.isInternetReachable) {
      errorAlert(t('common.NoInternetConnection'));
      return;
    }

    yield call(action.payload.setIsLoading, true);
    const {uid} = yield select((state) => state.auth.userData);
    const addNewTaskListToFirebase = (newTaskList: TaskListInterface) => {
      return DB.ref(`${Users}/${uid}/${taskLists}/${newTaskList.id}`).set(
        newTaskList,
      );
    };
    yield call(addNewTaskListToFirebase, action.payload.newTaskList);
    yield put(addNewTaskList(action.payload.newTaskList));
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

export function* addNewTaskWorker(action: AddNewTaskSagaActionType) {
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();
    if (!connectionStatus.isInternetReachable) {
      errorAlert(t('common.NoInternetConnection'));
      return;
    }

    yield call(action.payload.setIsLoading, true);
    const {uid} = yield select((state) => state.auth.userData);
    const addNewTaskToFirebase = (payload: AddNewTaskPayloadType) => {
      return DB.ref(
        `${Users}/${uid}/${taskLists}/${payload.taskListId}/${tasks}/${payload.newTask.id}`,
      ).set(payload.newTask);
    };
    yield call(addNewTaskToFirebase, action.payload);
    yield put(
      addNewTask(action.payload.modifiedTaskList, action.payload.taskListId),
    );
    yield call(action.payload.setIsLoading, false);
    yield call(action.payload.setModalVisible, false);
    yield call(action.payload.setNewTaskTitle, '');
  } catch (error) {
    yield call(action.payload.setIsLoading, false);
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}

export function* editTaskListTitleWorker(
  action: EditTaskListTitleFullActionType,
) {
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();
    if (!connectionStatus.isInternetReachable) {
      errorAlert(t('common.NoInternetConnection'));
      return;
    }

    yield call(action.payload.setIsLoading, true);
    const {uid} = yield select((state) => state.auth.userData);
    const sendModifiedTaskListToFirebase = (
      payload: EditTaskListTitleFullPayloadType,
    ) => {
      return DB.ref(
        `${Users}/${uid}/${taskLists}/${payload.taskListId}`,
      ).update({
        title: payload.editedTaskListTitle,
      });
    };
    yield call(sendModifiedTaskListToFirebase, action.payload);
    yield put(
      setEditedTaskListTitle(
        action.payload.taskListId,
        action.payload.editedTaskListTitle,
      ),
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
  action: DeleteTaskListFullActionType,
) {
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();
    if (!connectionStatus.isInternetReachable) {
      errorAlert(t('common.NoInternetConnection'));
      return;
    }

    yield call(action.payload.setIsLoading, true);
    const {uid} = yield select((state) => state.auth.userData);
    const deleteTaskListInFirebase = (
      payload: DeleteTaskListFullPayloadType,
    ) => {
      return DB.ref(
        `${Users}/${uid}/${taskLists}/${payload.taskListId}`,
      ).remove();
    };
    yield call(deleteTaskListInFirebase, action.payload);
    yield put(deleteTaskListFull(action.payload.taskListId));
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
  action: DeleteTaskListFromScreenActionType,
) {
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();
    if (!connectionStatus.isInternetReachable) {
      errorAlert(t('common.NoInternetConnection'));
      return;
    }

    yield call(action.payload.setIsLoading, true);
    const {uid} = yield select((state) => state.auth.userData);
    const deleteTaskListFromScreenInFirebase = (
      payload: DeleteTaskListFromScreenPayloadType,
    ) => {
      const modifiedTaskList = {...payload.fullTaskList};

      if (payload.deleteTodoTask) {
        DB.ref(`${Users}/${uid}/${taskLists}/${modifiedTaskList.id}`).update({
          showInToDo: false,
        });
        if (modifiedTaskList.tasks && modifiedTaskList.tasks.length > 0) {
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
          `${Users}/${uid}/${taskLists}/${modifiedTaskList.id}/${tasks}`,
        ).set(convertedTasksForFirebase);
      }
    };
    yield call(deleteTaskListFromScreenInFirebase, action.payload);
    yield put(
      deleteTaskListFromScreen(
        action.payload.fullTaskList,
        action.payload.deleteTodoTask,
        action.payload.deleteDoneTask,
      ),
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

export function* setTaskIsDoneWorker(action: SetTaskIsDoneActionType) {
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();
    if (!connectionStatus.isInternetReachable) {
      errorAlert(t('common.NoInternetConnection'));
      return;
    }

    yield call(action.payload.setIsLoading, true);
    const {uid} = yield select((state) => state.auth.userData);
    const setTaskIsDoneInFirebase = (payload: SetTaskIsDonePayloadType) => {
      return DB.ref(
        `${Users}/${uid}/${taskLists}/${payload.taskListId}/${tasks}/${payload.doneTaskId}`,
      ).update({isDone: true});
    };
    yield call(setTaskIsDoneInFirebase, action.payload);
    yield put(
      setTaskIsDone(action.payload.taskListId, action.payload.doneTaskId),
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

export function* editTaskTitleWorker(action: SetEditedTaskActionType) {
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();
    if (!connectionStatus.isInternetReachable) {
      errorAlert(t('common.NoInternetConnection'));
      return;
    }

    yield call(action.payload.setIsLoading, true);
    const {uid} = yield select((state) => state.auth.userData);
    const editTaskTitleInFirebase = (payload: SetEditedTaskPayloadType) => {
      return DB.ref(
        `${Users}/${uid}/${taskLists}/${payload.taskListId}/${tasks}/${payload.taskId}`,
      ).update({title: payload.editedTaskTitle});
    };
    yield call(editTaskTitleInFirebase, action.payload);
    yield put(
      setEditedTask(
        action.payload.taskListId,
        action.payload.taskId,
        action.payload.editedTaskTitle,
      ),
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

export function* deleteTaskWorker(action: DeleteTaskActionType) {
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();
    if (!connectionStatus.isInternetReachable) {
      errorAlert(t('common.NoInternetConnection'));
      return;
    }

    yield call(action.payload.setIsLoading, true);
    const {uid} = yield select((state) => state.auth.userData);
    const deleteTaskInFirebase = (payload: DeleteTaskPayloadType) => {
      return DB.ref(
        `${Users}/${uid}/${taskLists}/${payload.taskListId}/${tasks}/${payload.taskId}`,
      ).remove();
    };
    yield call(deleteTaskInFirebase, action.payload);
    yield put(deleteTask(action.payload.taskListId, action.payload.taskId));
    yield call(action.payload.setIsLoading, false);
    yield call(action.payload.setModalVisible, false);
  } catch (error) {
    yield call(action.payload.setIsLoading, false);
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}
