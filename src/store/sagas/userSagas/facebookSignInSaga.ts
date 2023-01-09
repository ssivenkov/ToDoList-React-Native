import { ONLINE, START_ANIMATION_DELAY } from '@constants/constants';
import { FIREBASE_OTHER } from '@enums/firebaseEnum';
import { checkInternetConnectionHelper } from '@helpers/checkInternetConnectionHelper';
import auth from '@react-native-firebase/auth';
import * as Sentry from '@sentry/react-native';
import { setModalMessageAction } from '@store/actions/userReducerActions/setModalMessageAction';
import { setProviderIDAction } from '@store/actions/userReducerActions/setProviderIDAction';
import { GetFacebookUserDataSagaActionReturnType } from '@store/actions/userSagaActions/FacebookSignInAction';
import { AuthCredentialType } from '@store/sagas/userSagas/googleSignInSaga';
import { t } from 'i18next';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { call, cancel, delay, put, putResolve } from 'redux-saga/effects';

export function* facebookSignInSaga(action: GetFacebookUserDataSagaActionReturnType) {
  const { setWaitingUserData } = action.payload;

  const { FACEBOOK_PROVIDER_ID } = FIREBASE_OTHER;

  try {
    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      yield put(setModalMessageAction({ modalMessage: internetConnectionStatus }));

      yield cancel();
    }

    yield call(setWaitingUserData, true);

    yield delay(START_ANIMATION_DELAY);

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
      yield call(Sentry.captureException, error);
      yield put(setModalMessageAction({ modalMessage: error.message }));
    }
  } finally {
    setWaitingUserData(false);
  }
}
