import {START_ANIMATION_DELAY} from '@constants/constants';
import auth from '@react-native-firebase/auth';
import {errorAlert} from '@root/helpers/alertHelper';
import {checkInternetConnectionHelper} from '@root/helpers/hasInternetConnectionHelper';
import {GetFacebookUserDataSagaActionReturnType} from '@store/actions/userSagaActions/FacebookSignInAction';
import {AuthCredentialType} from '@store/sagas/userSagas/googleSignInSaga';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {call, delay} from 'redux-saga/effects';

export function* facebookSignInSaga(
  action: GetFacebookUserDataSagaActionReturnType,
) {
  const {setWaitingUserData} = action.payload;
  try {
    const internetIsOn: boolean = yield call(checkInternetConnectionHelper);
    if (!internetIsOn) return;

    yield call(setWaitingUserData, true);
    yield delay(START_ANIMATION_DELAY);

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