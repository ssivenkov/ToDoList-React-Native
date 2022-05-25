import {START_ANIMATION_DELAY} from '@constants/constants';
import {GoogleSignInCancelError} from '@constants/errorMessages';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {errorAlert} from '@root/helpers/alertHelper';
import {checkInternetConnectionHelper} from '@root/helpers/hasInternetConnectionHelper';
import {setProviderIDAction} from '@store/actions/userReducerActions/setProviderIDAction';
import {GetGoogleUserDataSagaActionReturnType} from '@store/actions/userSagaActions/GoogleSignInAction';
import {t} from 'i18next';
import {call, delay, putResolve} from 'redux-saga/effects';

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
    const internetIsOn: boolean = yield call(checkInternetConnectionHelper);
    if (!internetIsOn) return;

    yield call(setWaitingUserData, true);
    yield delay(START_ANIMATION_DELAY);

    const {idToken} = yield call(GoogleSignin.signIn);

    if (!idToken) {
      throw t('signInScreen.ErrorGettingAccessToken');
    }

    const googleCredential: AuthCredentialType = yield call(
      auth.GoogleAuthProvider.credential,
      idToken,
    );

    const providerID = auth.GoogleAuthProvider.PROVIDER_ID;
    yield putResolve(setProviderIDAction({providerID}));

    const signInWithCredential = (credential: AuthCredentialType) => {
      return auth().signInWithCredential(credential);
    };
    yield call(signInWithCredential, googleCredential);
  } catch (error: any) {
    setWaitingUserData(false);

    if (error.message === GoogleSignInCancelError) {
      return errorAlert(t('signInScreen.CancelAuthProcess'));
    }

    errorAlert(error);
  }
}
