import auth from '@react-native-firebase/auth';
import {errorAlert} from '@root/helpers/alert';
import {delay} from '@root/helpers/delay';
import {GetFacebookUserDataSagaActionReturnType} from '@store/actions/authSagaActions/FacebookSignIn';
import {AuthCredentialType} from '@store/sagas/authSagas/googleSignInWorker';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {call} from 'redux-saga/effects';

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

    const signInWithCredential = (credential: AuthCredentialType) => {
      return auth().signInWithCredential(credential);
    };
    yield call(signInWithCredential, facebookCredential);
  } catch (error) {
    if (error instanceof Error) {
      errorAlert(error);
      setWaitingUserData(false);
    }
  }
}
