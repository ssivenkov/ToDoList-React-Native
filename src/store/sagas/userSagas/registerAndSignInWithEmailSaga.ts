import { ONLINE, START_ANIMATION_DELAY } from '@constants/constants';
import { registerWithEmailErrorCodes } from '@constants/errors';
import { checkInternetConnectionHelper } from '@helpers/checkInternetConnectionHelper';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { RegisterWithEmailErrorType } from '@root/types/errors/signInNavigatorErrors';
import * as Sentry from '@sentry/react-native';
import { setModalMessageAction } from '@store/actions/userReducerActions/setModalMessageAction';
import { setWaitingUserDataOnSignInAction } from '@store/actions/userReducerActions/setWaitingUserDataOnSignInAction';
import { GetUserDataSagaActionReturnType } from '@store/actions/userSagaActions/signInWithEmailAction';
import { t } from 'i18next';
import { call, cancel, delay, put, putResolve } from 'redux-saga/effects';

export function* registerAndSignInWithEmailSaga(action: GetUserDataSagaActionReturnType) {
  const { email, password } = action.payload;

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

    const createUser = () => {
      return auth().createUserWithEmailAndPassword(email, password);
    };

    const signInWithCredential = () => {
      return auth().signInWithEmailAndPassword(email, password);
    };

    yield call(createUser);
    yield call(signInWithCredential);
  } catch (error) {
    if (error instanceof Error) {
      const signInError = error as RegisterWithEmailErrorType;

      if (registerWithEmailErrorCodes.includes(signInError.code)) {
        yield put(
          setModalMessageAction({
            modalMessage: t(`signInNavigator.${signInError.code}`),
          }),
        );
      } else {
        yield put(setModalMessageAction({ modalMessage: t('common.UnknownError') }));
        yield call(Sentry.captureException, error);
      }
    }
  } finally {
    yield putResolve(
      setWaitingUserDataOnSignInAction({ isWaitingUserDataOnSignIn: false }),
    );
  }
}
