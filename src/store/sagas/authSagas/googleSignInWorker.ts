import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {errorAlert} from '@root/helpers/alert';
import {delay} from '@root/helpers/delay';
import {GetGoogleUserDataSagaActionReturnType} from '@store/actions/authSagaActions/GoogleSignIn';
import {call} from 'redux-saga/effects';

export type AuthCredentialType = {
  providerId: string;
  token: string;
  secret: string;
};

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

    const signInWithCredential = (credential: AuthCredentialType) => {
      return auth().signInWithCredential(credential);
    };
    yield call(signInWithCredential, googleCredential);
  } catch (error) {
    if (error instanceof Error) {
      setWaitingUserData(false);
      errorAlert(error);
    }
  }
}
