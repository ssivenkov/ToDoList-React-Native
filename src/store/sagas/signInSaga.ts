import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {errorAlert} from '@root/helpers/Alert';
import {setAuthStatus} from '@store/actions/signInActions/signInActions';
import {
  GetFacebookUserDataSagaActionType,
  GetGoogleUserDataSagaActionType,
  AuthCredentialType,
} from '@store/actions/signInSagaActions/types';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {call, put} from 'redux-saga/effects';

const commonSignInWithCredential = (credential: AuthCredentialType) => {
  return auth().signInWithCredential(credential);
};

const commonSignOut = () => {
  return auth().signOut();
};

// Google

export function* googleUserDataWorker(action: GetGoogleUserDataSagaActionType) {
  const {setWaitingGoogleUserData} = action.payload;
  setWaitingGoogleUserData(true);
  try {
    const {idToken} = yield call(GoogleSignin.signIn);
    const googleCredential: AuthCredentialType = yield call(
      auth.GoogleAuthProvider.credential,
      idToken,
    );
    yield call(commonSignInWithCredential, googleCredential);
    yield put(setAuthStatus(true));
  } catch (error) {
    if (error instanceof Error) errorAlert(error);
  }
}

export function* googleSignOutWorker() {
  try {
    yield call(commonSignOut);
    yield call(GoogleSignin.signOut);
    yield put(setAuthStatus(false));
  } catch (error) {
    if (error instanceof Error) errorAlert(error);
  }
}

// Facebook

export function* facebookUserDataWorker(
  action: GetFacebookUserDataSagaActionType,
) {
  const {setWaitingFacebookUserData} = action.payload;
  setWaitingFacebookUserData(true);
  try {
    const {isCancelled} = yield call(LoginManager.logInWithPermissions, [
      'public_profile',
      'email',
    ]);

    // User cancelled the login process
    if (isCancelled) return null;

    const {accessToken} = yield call(AccessToken.getCurrentAccessToken);
    const facebookCredential: AuthCredentialType = yield call(
      auth.FacebookAuthProvider.credential,
      accessToken,
    );
    yield call(commonSignInWithCredential, facebookCredential);
    yield put(setAuthStatus(true));
  } catch (error) {
    if (error instanceof Error) errorAlert(error);
  }
}

export function* facebookSignOutWorker() {
  try {
    yield call(commonSignOut);
    yield put(setAuthStatus(false));
  } catch (error) {
    if (error instanceof Error) errorAlert(error);
  }
}
