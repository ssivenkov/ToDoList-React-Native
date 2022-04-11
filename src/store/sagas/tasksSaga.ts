import {taskLists, Users} from '@constants/constants';
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
import {TaskListType, TaskType} from '@store/reducers/tasksReducer/types';
import {call, put, select} from 'redux-saga/effects';

export function* checkUserWorker() {
  try {
    const {uid} = yield select((state) => state.auth.userData);
    let isUserExist = false;
    const findUser = () => {
      return DB.ref(`${Users}/${uid}`)
        .once('value')
        .then((snapshot) => (isUserExist = snapshot.exists()));
    };
    yield call(findUser);

    if (!isUserExist) {
      const newUserData = {userToken: uid, taskLists: []};
      yield DB.ref(Users).child(uid).set(newUserData);
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
    let userTaskListsObject;
    const getTasks = () => {
      return DB.ref(`${Users}/${uid}`)
        .once('value')
        .then((snapshot) => (userTaskListsObject = snapshot.val().taskLists));
    };
    yield call(getTasks);

    if (userTaskListsObject && Object.keys(userTaskListsObject).length > 0) {
      const userTaskListsArray: TaskListType[] = Object.entries(
        userTaskListsObject,
      ).map((item: any) => item[1]);
      yield put(setTaskLists(userTaskListsArray));
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
    const addNewTaskListToFirebase = (newTaskList: TaskListType) => {
      DB.ref(Users)
        .child(uid)
        .child(taskLists)
        .child(newTaskList.id)
        .set(newTaskList);
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
      DB.ref(Users)
        .child(uid)
        .child(taskLists)
        .child(payload.taskListId)
        .set(payload.modifiedTaskList);
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
      DB.ref(Users)
        .child(uid)
        .child(taskLists)
        .child(payload.taskListId)
        .update({title: payload.editedTaskListTitle});
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
      DB.ref(Users)
        .child(uid)
        .child(taskLists)
        .child(payload.taskListId)
        .remove();
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
        modifiedTaskList.showInToDo = false;
        if (modifiedTaskList.tasks) {
          modifiedTaskList.tasks = modifiedTaskList.tasks.filter(
            (task) => task.isDone,
          );
        }
      }
      if (payload.deleteDoneTask) {
        modifiedTaskList.showInToDo = true;
        if (modifiedTaskList.tasks) {
          modifiedTaskList.tasks = modifiedTaskList.tasks.filter(
            (task) => !task.isDone,
          );
        }
      }

      DB.ref(Users)
        .child(uid)
        .child(taskLists)
        .child(modifiedTaskList.id)
        .set(modifiedTaskList);
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
    let targetTaskList: any;
    const findTargetTaskList = () => {
      return DB.ref(Users)
        .child(uid)
        .child(taskLists)
        .child(action.payload.taskListId)
        .once('value')
        .then((snapshot) => (targetTaskList = snapshot.val()));
    };
    yield call(findTargetTaskList);

    const setTaskIsDoneInFirebase = (payload: SetTaskIsDonePayloadType) => {
      if (targetTaskList.tasks) {
        targetTaskList.tasks = targetTaskList.tasks.map((task: TaskType) => {
          if (task.id === payload.doneTaskId) {
            const doneTask = {...task};
            doneTask.isDone = true;
            return doneTask;
          } else return task;
        });
      }

      DB.ref(Users)
        .child(uid)
        .child(taskLists)
        .child(action.payload.taskListId)
        .child('tasks')
        .set(targetTaskList.tasks);
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
    let targetTaskList: any;
    const findTargetTaskList = () => {
      return DB.ref(Users)
        .child(uid)
        .child(taskLists)
        .child(action.payload.taskListId)
        .once('value')
        .then((snapshot) => {
          targetTaskList = snapshot.val();
        });
    };
    yield call(findTargetTaskList);

    const editTaskTitleInFirebase = (payload: SetEditedTaskPayloadType) => {
      targetTaskList.tasks = targetTaskList.tasks.map((task: TaskType) => {
        if (task.id === payload.taskId) {
          const editedTask = {...task};
          editedTask.title = payload.editedTaskTitle;
          return editedTask;
        }
        return task;
      });

      DB.ref(Users)
        .child(uid)
        .child(taskLists)
        .child(payload.taskListId)
        .child('tasks')
        .set(targetTaskList.tasks);
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
    let targetTaskList: any;
    const findTargetTaskList = () => {
      return DB.ref(Users)
        .child(uid)
        .child(taskLists)
        .child(action.payload.taskListId)
        .once('value')
        .then((snapshot) => (targetTaskList = snapshot.val()));
    };
    yield call(findTargetTaskList);

    const deleteTaskInFirebase = (payload: DeleteTaskPayloadType) => {
      targetTaskList.tasks = targetTaskList.tasks.filter(
        (task: TaskType) => task.id !== payload.taskId,
      );

      DB.ref(Users)
        .child(uid)
        .child(taskLists)
        .child(payload.taskListId)
        .child('tasks')
        .set(targetTaskList.tasks);
    };

    yield call(deleteTaskInFirebase, action.payload);
    yield put(deleteTask(action.payload.taskListId, action.payload.taskId));
  } catch (error) {
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}
