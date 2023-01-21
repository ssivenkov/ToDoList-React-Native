import { ONLINE, START_ANIMATION_DELAY } from '@constants/constants';
import { userSignInErrors } from '@constants/errors';
import { FIREBASE_OTHER } from '@enums/firebaseEnum';
import { checkInternetConnectionHelper } from '@helpers/checkInternetConnectionHelper';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as Sentry from '@sentry/react-native';
import { setModalMessageAction } from '@store/actions/userReducerActions/setModalMessageAction';
import { setProviderIDAction } from '@store/actions/userReducerActions/setProviderIDAction';
import { setWaitingUserDataOnSignInAction } from '@store/actions/userReducerActions/setWaitingUserDataOnSignInAction';
import { AuthCredentialType } from '@store/sagas/userSagas/googleSignInSaga';
import { t } from 'i18next';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { call, cancel, delay, put, putResolve } from 'redux-saga/effects';

export function* facebookSignInSaga() {
  const { FACEBOOK_PROVIDER_ID } = FIREBASE_OTHER;

  try {
    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      yield put(setModalMessageAction({ modalMessage: internetConnectionStatus }));

      yield cancel();
    }

    yield putResolve(
      setWaitingUserDataOnSignInAction({ isWaitingUserDataOnSignIn: true }),
    );

    yield delay(START_ANIMATION_DELAY);

    yield call(GoogleSignin.hasPlayServices, { showPlayServicesUpdateDialog: true });

    const { isCancelled } = yield call(LoginManager.logInWithPermissions, [
      'public_profile',
      'email',
    ]);

    if (isCancelled) {
      yield put(
        setModalMessageAction({
          modalMessage: t('signInScreen.CancelAuthProcess'),
        }),
      );

      yield cancel();
    }

    const { accessToken } = yield call(AccessToken.getCurrentAccessToken);

    if (!accessToken) {
      yield put(
        setModalMessageAction({
          modalMessage: t('signInScreen.ErrorGettingAccessToken'),
        }),
      );

      yield cancel();
    }

    const facebookCredential: AuthCredentialType = yield call(
      auth.FacebookAuthProvider.credential,
      accessToken,
    );

    const providerID = FACEBOOK_PROVIDER_ID;

    yield putResolve(setProviderIDAction({ providerID }));

    const signInWithCredential = (credential: AuthCredentialType) => {
      return auth().signInWithCredential(credential);
    };

    yield call(signInWithCredential, facebookCredential);
  } catch (error) {
    if (error instanceof Error) {
      // @ts-ignore
      if (userSignInErrors.includes(error.code)) {
        yield cancel();
      }

      yield call(Sentry.captureException, error);
      yield put(setModalMessageAction({ modalMessage: error.message }));
    }
  } finally {
    yield putResolve(
      setWaitingUserDataOnSignInAction({ isWaitingUserDataOnSignIn: false }),
    );
  }
}
