import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import auth from '@react-native-firebase/auth';
import {errorAlert} from '@root/helpers/alertHelper';
import {hasInternetConnectionHelper} from '@root/helpers/hasInternetConnectionHelper';
import {GetFacebookUserDataSagaActionReturnType} from '@store/actions/authSagaActions/FacebookSignInAction';
import {AuthCredentialType} from '@store/sagas/authSagas/googleSignInSaga';
import {t} from 'i18next';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {call, delay} from 'redux-saga/effects';

export function* facebookSignInSaga(
  action: GetFacebookUserDataSagaActionReturnType,
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
    errorAlert(error);
    setWaitingUserData(false);
  }
}
