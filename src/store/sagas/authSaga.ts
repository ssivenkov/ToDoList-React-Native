import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {errorAlert} from '@root/helpers/Alert';
import {setAuthState} from '@store/actions/authActions/authActions';
import {
  GetFacebookUserDataSagaActionType,
  GetGoogleUserDataSagaActionType,
  AuthCredentialType,
} from '@store/actions/authSagaActions/types';
import {setTaskLists} from '@store/actions/tasksActions/tasksActions';
import {initialAuthState} from '@store/reducers/authReducer/authReducer';
import {UserDataType} from '@store/reducers/authReducer/types';
import {AppRootStateType} from '@store/store';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {call, put, select} from 'redux-saga/effects';

const signInWithCredential = (credential: AuthCredentialType) => {
  return auth().signInWithCredential(credential);
};

export function* googleSignInWorker(action: GetGoogleUserDataSagaActionType) {
  const {setWaitingUserData} = action.payload;
  try {
    yield call(setWaitingUserData, true);
    // delay for starting animation
    const delay = (time: number) =>
      new Promise((resolve) => setTimeout(resolve, time));
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
    // delay for starting animation
    const delay = (time: number) =>
      new Promise((resolve) => setTimeout(resolve, time));
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

    // delay for starting animation
    const delay = (time: number) =>
      new Promise((resolve) => setTimeout(resolve, time));
    yield call(delay, 10);

    yield call(signOut);
    const userData: UserDataType = yield select(
      (state: AppRootStateType) => state.auth.userData,
    );
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
