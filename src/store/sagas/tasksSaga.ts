import {taskLists, tasks, Users} from '@constants/constants';
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
  TaskListBeforeConvertInterface,
  TaskListInterface,
  TaskListWithTaskType,
} from '@store/reducers/tasksReducer/types';
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
    const {uid} = yield select((state) => state.auth.userData);
    const addNewTaskListToFirebase = (newTaskList: TaskListInterface) => {
      DB.ref(`${Users}/${uid}/${taskLists}/${newTaskList.id}`).set(newTaskList);
    };
    yield call(addNewTaskListToFirebase, action.payload);
    yield put(addNewTaskList(action.payload));
  } catch (error) {
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}

export function* addNewTaskWorker(action: AddNewTaskSagaActionType) {
  try {
    const {uid} = yield select((state) => state.auth.userData);
    const addNewTaskToFirebase = (payload: AddNewTaskPayloadType) => {
      DB.ref(
        `${Users}/${uid}/${taskLists}/${payload.taskListId}/${tasks}/${payload.newTask.id}`,
      ).set(payload.newTask);
    };
    yield call(addNewTaskToFirebase, action.payload);
    yield put(
      addNewTask(action.payload.modifiedTaskList, action.payload.taskListId),
    );
  } catch (error) {
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}

export function* editTaskListTitleWorker(
  action: EditTaskListTitleFullActionType,
) {
  try {
    const {uid} = yield select((state) => state.auth.userData);
    const sendModifiedTaskListToFirebase = (
      payload: EditTaskListTitleFullPayloadType,
    ) => {
      DB.ref(`${Users}/${uid}/${taskLists}/${payload.taskListId}`).update({
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
  } catch (error) {
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}

export function* deleteTaskListFullWorker(
  action: DeleteTaskListFullActionType,
) {
  try {
    const {uid} = yield select((state) => state.auth.userData);
    const deleteTaskListInFirebase = (
      payload: DeleteTaskListFullPayloadType,
    ) => {
      DB.ref(`${Users}/${uid}/${taskLists}/${payload.taskListId}`).remove();
    };
    yield call(deleteTaskListInFirebase, action.payload);
    yield put(deleteTaskListFull(action.payload.taskListId));
  } catch (error) {
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}

export function* deleteTaskListFromScreenWorker(
  action: DeleteTaskListFromScreenActionType,
) {
  try {
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
        DB.ref(`${Users}/${uid}/${taskLists}/${modifiedTaskList.id}`).update({
          showInToDo: true,
        });
        if (modifiedTaskList.tasks && modifiedTaskList.tasks.length > 0) {
          modifiedTaskList.tasks = modifiedTaskList.tasks.filter(
            (task) => !task.isDone,
          );
        }
      }

      if (modifiedTaskList.tasks && modifiedTaskList.tasks[0]) {
        const FirebaseTasks = {
          [modifiedTaskList.tasks[0].id]: {...modifiedTaskList.tasks[0]},
        };

        DB.ref(
          `${Users}/${uid}/${taskLists}/${modifiedTaskList.id}/${tasks}`,
        ).set(FirebaseTasks);
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
  } catch (error) {
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}

export function* setTaskIsDoneWorker(action: SetTaskIsDoneActionType) {
  try {
    const {uid} = yield select((state) => state.auth.userData);
    const setTaskIsDoneInFirebase = (payload: SetTaskIsDonePayloadType) => {
      DB.ref(
        `${Users}/${uid}/${taskLists}/${payload.taskListId}/${tasks}/${payload.doneTaskId}`,
      ).update({isDone: true});
    };
    yield call(setTaskIsDoneInFirebase, action.payload);
    yield put(
      setTaskIsDone(action.payload.taskListId, action.payload.doneTaskId),
    );
  } catch (error) {
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}

export function* editTaskTitleWorker(action: SetEditedTaskActionType) {
  try {
    const {uid} = yield select((state) => state.auth.userData);
    const editTaskTitleInFirebase = (payload: SetEditedTaskPayloadType) => {
      DB.ref(
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
  } catch (error) {
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}

export function* deleteTaskWorker(action: DeleteTaskActionType) {
  try {
    const {uid} = yield select((state) => state.auth.userData);
    const deleteTaskInFirebase = (payload: DeleteTaskPayloadType) => {
      DB.ref(
        `${Users}/${uid}/${taskLists}/${payload.taskListId}/${tasks}/${payload.taskId}`,
      ).remove();
    };
    yield call(deleteTaskInFirebase, action.payload);
    yield put(deleteTask(action.payload.taskListId, action.payload.taskId));
  } catch (error) {
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}
