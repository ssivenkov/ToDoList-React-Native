import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {errorAlert} from '@root/helpers/Alert';
import {
  setAuthStatus,
  setUserData,
} from '@store/actions/authActions/authActions';
import {
  GetFacebookUserDataSagaActionType,
  GetGoogleUserDataSagaActionType,
  AuthCredentialType,
} from '@store/actions/authSagaActions/types';
import {setTaskLists} from '@store/actions/tasksActions/tasksActions';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {call, put, select} from 'redux-saga/effects';

const signInWithCredential = (credential: AuthCredentialType) => {
  return auth().signInWithCredential(credential);
};

const signOut = () => {
  return auth().signOut();
};

export function* googleSignInWorker(action: GetGoogleUserDataSagaActionType) {
  const {setWaitingUserData} = action.payload;
  setWaitingUserData(true);
  try {
    const {idToken} = yield call(GoogleSignin.signIn);
    const googleCredential: AuthCredentialType = yield call(
      auth.GoogleAuthProvider.credential,
      idToken,
    );
    yield call(signInWithCredential, googleCredential);
  } catch (error) {
    if (error instanceof Error) {
      errorAlert(error);
      setWaitingUserData(false);
    }
  }
}

export function* facebookSignInWorker(
  action: GetFacebookUserDataSagaActionType,
) {
  const {setWaitingUserData} = action.payload;
  setWaitingUserData(true);
  try {
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
    yield call(signOut);
    const {_user} = yield select((state) => state.auth.userData);

    if (_user.providerData[0].providerId === 'google.com') {
      yield call(GoogleSignin.signOut);
    }
    yield put(setUserData(null));
    yield put(setAuthStatus(false));
    yield put(setTaskLists([]));
  } catch (error) {
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}
