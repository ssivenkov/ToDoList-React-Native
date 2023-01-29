import { GOOGLE_PLAY_LINK } from '@env';
import * as Sentry from '@sentry/react-native';
import { setModalMessageAction } from '@store/actions/userReducerActions/setModalMessageAction';
import { t } from 'i18next';
import { Share } from 'react-native';
import { call, put } from 'redux-saga/effects';

export function* shareAppSaga() {
  try {
    const descriptionText = t('accountScreen.ShareAppMessage');

    const shareMessage = () => {
      Share.share({
        message: `${descriptionText} Google Play: ${GOOGLE_PLAY_LINK}`,
      });
    };

    yield call(shareMessage);
  } catch (error) {
    if (error instanceof Error) {
      yield call(Sentry.captureException, error);
      yield put(setModalMessageAction({ modalMessage: error.message }));
    }
  }
}
