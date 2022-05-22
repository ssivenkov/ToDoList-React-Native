import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {errorAlert} from '@root/helpers/alertHelper';
import {hasInternetConnectionHelper} from '@root/helpers/hasInternetConnectionHelper';
import {GetGoogleUserDataSagaActionReturnType} from '@store/actions/authSagaActions/GoogleSignInAction';
import {t} from 'i18next';
import {call, delay} from 'redux-saga/effects';

export type AuthCredentialType = {
  providerId: string;
  token: string;
  secret: string;
};

export function* googleSignInSaga(
  action: GetGoogleUserDataSagaActionReturnType,
) {
  const {setWaitingUserData} = action.payload;
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();

    if (!hasInternetConnectionHelper(connectionStatus)) {
      errorAlert(t('common.NoInternetConnection'));

      return;
    }

    yield call(setWaitingUserData, true);
    yield delay(10);

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
    setWaitingUserData(false);
    errorAlert(error);
  }
}
