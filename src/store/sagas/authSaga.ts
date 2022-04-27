import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {errorAlert} from '@root/helpers/alert';
import {delay} from '@root/helpers/delay';
import {
  setAuthState,
  setChannelID,
} from '@store/actions/authActions/authActions';
import {
  GetFacebookUserDataSagaActionType,
  GetGoogleUserDataSagaActionType,
  AuthCredentialType,
} from '@store/actions/authSagaActions/types';
import {setTaskLists} from '@store/actions/tasksActions/tasksActions';
import {initialAuthState} from '@store/reducers/authReducer/authReducer';
import {UserDataType} from '@store/reducers/authReducer/types';
import {getUserData} from '@store/selectors/authSelectors';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import PushNotification from 'react-native-push-notification';
import {call, put, select} from 'redux-saga/effects';

const signInWithCredential = (credential: AuthCredentialType) => {
  return auth().signInWithCredential(credential);
};

export function* createChannelWorker() {
  try {
    const getChannelID = () => {
      return messaging().getToken();
    };
    const channelId: string = yield call(getChannelID);
    const createChannel = () => {
      PushNotification.createChannel(
        {
          channelId,
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
    yield put(setChannelID(channelId));
  } catch (error) {
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}

export function* googleSignInWorker(action: GetGoogleUserDataSagaActionType) {
  const {setWaitingUserData} = action.payload;
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
  action: GetFacebookUserDataSagaActionType,
) {
  const {setWaitingUserData} = action.payload;
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

    yield call(delay, 10);

    yield call(signOut);
    const userData: UserDataType = yield select(getUserData);
    const providerId = userData && userData.providerData[0]?.providerId;

    if (providerId === 'google.com') {
      yield call(GoogleSignin.signOut);
    }
    yield put(setAuthState(initialAuthState));
    yield put(setTaskLists([]));
  } catch (error) {
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}
