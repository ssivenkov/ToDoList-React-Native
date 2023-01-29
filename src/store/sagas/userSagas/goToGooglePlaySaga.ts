import { ONLINE } from '@constants/constants';
import { GOOGLE_PLAY_LINK } from '@env';
import { checkInternetConnectionHelper } from '@helpers/checkInternetConnectionHelper';
import * as Sentry from '@sentry/react-native';
import { setModalMessageAction } from '@store/actions/userReducerActions/setModalMessageAction';
import { Linking } from 'react-native';
import { call, cancel, put } from 'redux-saga/effects';

export function* goToGooglePlaySaga() {
  try {
    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      yield put(setModalMessageAction({ modalMessage: internetConnectionStatus }));

      yield cancel();
    }

    const goToGooglePlay = () => {
      Linking.openURL(GOOGLE_PLAY_LINK);
    };

    yield call(goToGooglePlay);
  } catch (error) {
    if (error instanceof Error) {
      yield call(Sentry.captureException, error);
      yield put(setModalMessageAction({ modalMessage: error.message }));
    }
  }
}
