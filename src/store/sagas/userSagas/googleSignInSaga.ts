import { ONLINE, START_ANIMATION_DELAY } from '@constants/constants';
import { GoogleSignInCancelError, signInActionCanceled } from '@constants/errorMessages';
import { commonSignInErrors } from '@constants/errors';
import { FIREBASE_OTHER } from '@enums/firebaseEnum';
import { checkInternetConnectionHelper } from '@helpers/checkInternetConnectionHelper';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as Sentry from '@sentry/react-native';
import { setModalMessageAction } from '@store/actions/userReducerActions/setModalMessageAction';
import { setProviderIDAction } from '@store/actions/userReducerActions/setProviderIDAction';
import { setWaitingUserDataOnSignInAction } from '@store/actions/userReducerActions/setWaitingUserDataOnSignInAction';
import { t } from 'i18next';
import { call, cancel, delay, put, putResolve } from 'redux-saga/effects';

export type AuthCredentialType = {
  providerId: string;
  secret: string;
  token: string;
};

export function* googleSignInSaga() {
  const { GOOGLE_PROVIDER_ID } = FIREBASE_OTHER;

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

    const { idToken } = yield call(GoogleSignin.signIn);

    if (!idToken) {
      yield put(
        setModalMessageAction({
          modalMessage: t('signInNavigator.GettingAccessTokenErrorModalTitle'),
        }),
      );

      yield cancel();
    }

    const googleCredential: AuthCredentialType = yield call(
      auth.GoogleAuthProvider.credential,
      idToken,
    );

    const providerID = GOOGLE_PROVIDER_ID;

    yield putResolve(setProviderIDAction({ providerID }));

    const signInWithCredential = (credential: AuthCredentialType) => {
      return auth().signInWithCredential(credential);
    };

    yield call(signInWithCredential, googleCredential);
  } catch (error) {
    if (
      (error instanceof Error && error.message === GoogleSignInCancelError) ||
      (error instanceof Error && error.message === signInActionCanceled)
    ) {
      yield put(
        setModalMessageAction({
          modalMessage: t('signInNavigator.CancelAuthProcessModalTitle'),
        }),
      );
    } else if (error instanceof Error) {
      // @ts-ignore
      if (commonSignInErrors.includes(error.code)) {
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
