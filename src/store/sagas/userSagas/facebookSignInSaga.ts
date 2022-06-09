import {
  FACEBOOK_PROVIDER_ID,
  ONLINE,
  START_ANIMATION_DELAY,
} from '@constants/constants';
import auth from '@react-native-firebase/auth';
import {checkInternetConnectionHelper} from '@root/helpers/checkInternetConnectionHelper';
import {setModalErrorMessageAction} from '@store/actions/userReducerActions/setModalErrorMessageAction';
import {setProviderIDAction} from '@store/actions/userReducerActions/setProviderIDAction';
import {GetFacebookUserDataSagaActionReturnType} from '@store/actions/userSagaActions/FacebookSignInAction';
import {AuthCredentialType} from '@store/sagas/userSagas/googleSignInSaga';
import {t} from 'i18next';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {call, delay, put, putResolve} from 'redux-saga/effects';

export function* facebookSignInSaga(
  action: GetFacebookUserDataSagaActionReturnType,
) {
  const {setWaitingUserData} = action.payload;
  try {
    const internetConnectionStatus: string = yield call(
      checkInternetConnectionHelper,
    );

    if (internetConnectionStatus !== ONLINE) {
      throw Error(internetConnectionStatus);
    }

    yield call(setWaitingUserData, true);
    yield delay(START_ANIMATION_DELAY);

    const {isCancelled} = yield call(LoginManager.logInWithPermissions, [
      'public_profile',
      'email',
    ]);

    if (isCancelled) {
      throw t('signInScreen.CancelAuthProcess');
    }

    const {accessToken} = yield call(AccessToken.getCurrentAccessToken);

    if (!accessToken) {
      throw t('signInScreen.ErrorGettingAccessToken');
    }

    const facebookCredential: AuthCredentialType = yield call(
      auth.FacebookAuthProvider.credential,
      accessToken,
    );

    const providerID = FACEBOOK_PROVIDER_ID;
    yield putResolve(setProviderIDAction({providerID}));

    const signInWithCredential = (credential: AuthCredentialType) => {
      return auth().signInWithCredential(credential);
    };

    yield call(signInWithCredential, facebookCredential);
  } catch (error) {
    if (error instanceof Error) {
      yield put(setModalErrorMessageAction({errorModalMessage: error.message}));
    }

    setWaitingUserData(false);
  }
}
