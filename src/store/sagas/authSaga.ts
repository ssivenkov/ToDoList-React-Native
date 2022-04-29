import {Users} from '@constants/constants';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {DB} from '@root/api/DB';
import {errorAlert} from '@root/helpers/alert';
import {delay} from '@root/helpers/delay';
import {setAuthState} from '@store/actions/authReducerActions/setAuthState';
import {setChannelID} from '@store/actions/authReducerActions/setChannelID';
import {GetFacebookUserDataSagaActionReturnType} from '@store/actions/authSagaActions/FacebookSignIn';
import {GetGoogleUserDataSagaActionReturnType} from '@store/actions/authSagaActions/GoogleSignIn';
import {syncUserTaskLists} from '@store/actions/authSagaActions/syncUserTaskLists';
import {setNotifications} from '@store/actions/tasksReducerActions/notificationsActions/setNotifications';
import {setTaskLists} from '@store/actions/tasksReducerActions/taskListsActions/setTaskLists';
import {initialAuthState} from '@store/reducers/authReducer/authReducer';
import {
  SnapshotType,
  UserDataType,
  UserIDType,
} from '@store/reducers/authReducer/types';
import {
  TaskListBeforeConvertInterface,
  TaskListInterface,
  TaskListWithTaskType,
} from '@store/reducers/tasksReducer/types';
import {getUserData, getUserID} from '@store/selectors/authSelectors';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import PushNotification from 'react-native-push-notification';
import {call, put, select} from 'redux-saga/effects';

type AuthCredentialType = {
  providerId: string;
  token: string;
  secret: string;
};

const signInWithCredential = (credential: AuthCredentialType) => {
  return auth().signInWithCredential(credential);
};

export function* checkUserWorker() {
  try {
    const userID: UserIDType = yield select(getUserID);
    const snapshot: SnapshotType = yield DB.ref(`${Users}/${userID}`).once(
      'value',
    );
    const isUserExist = snapshot.exists();

    if (!isUserExist && userID) {
      DB.ref(`${Users}/${userID}`).set({userToken: userID});
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

export function* createChannelWorker() {
  try {
    const getChannelID = () => {
      return messaging().getToken();
    };
    const channelID: string = yield call(getChannelID);
    const createChannel = () => {
      PushNotification.createChannel(
        {
          channelId: channelID,
          channelName: 'Task notification channel',
          channelDescription: 'A channel to categorise your notifications',
          playSound: true,
          soundName: 'default',
          importance: 4,
          vibrate: true,
        },
        (created) => created, // callback returns whether the channel was created, false means it already existed.
      );
    };

    yield call(createChannel);
    yield put(setChannelID({channelID}));
  } catch (error) {
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}

export function* googleSignInWorker(
  action: GetGoogleUserDataSagaActionReturnType,
) {
  const setWaitingUserData = action.payload.setWaitingUserData;
  try {
    yield call(setWaitingUserData, true);
    yield call(delay, 10);

    const {idToken} = yield call(GoogleSignin.signIn);
    const googleCredential: AuthCredentialType = yield call(
      auth.GoogleAuthProvider.credential,
      idToken,
    );
    yield call(signInWithCredential, googleCredential);
  } catch (error) {
    if (error instanceof Error) {
      setWaitingUserData(false);
      errorAlert(error);
    }
  }
}

export function* facebookSignInWorker(
  action: GetFacebookUserDataSagaActionReturnType,
) {
  const setWaitingUserData = action.payload.setWaitingUserData;
  try {
    yield call(setWaitingUserData, true);
    yield call(delay, 10);

    const {isCancelled} = yield call(LoginManager.logInWithPermissions, [
      'public_profile',
      'email',
    ]);

    // User cancelled the login process
    if (isCancelled) {
      return null;
    }

    const {accessToken} = yield call(AccessToken.getCurrentAccessToken);
    const facebookCredential: AuthCredentialType = yield call(
      auth.FacebookAuthProvider.credential,
      accessToken,
    );
    yield call(signInWithCredential, facebookCredential);
  } catch (error) {
    if (error instanceof Error) {
      errorAlert(error);
      setWaitingUserData(false);
    }
  }
}

export function* signOutWorker() {
  try {
    const signOut = () => {
      return auth().signOut();
    };
    const userData: UserDataType = yield select(getUserData);
    const providerId = userData?.providerData[0]?.providerId;
    yield call(delay, 10);

    yield call(signOut);

    if (providerId === 'google.com') {
      yield call(GoogleSignin.signOut);
    }
    yield put(setAuthState({authState: initialAuthState}));
    yield put(setTaskLists({taskLists: []}));
  } catch (error) {
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}
