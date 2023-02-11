import { ONLINE } from '@constants/constants';
import { checkInternetConnectionHelper } from '@helpers/checkInternetConnectionHelper';
import messaging from '@react-native-firebase/messaging';
import * as Sentry from '@sentry/react-native';
import { setChannelIDAction } from '@store/actions/userReducerActions/setChannelIDAction';
import { setModalMessageAction } from '@store/actions/userReducerActions/setModalMessageAction';
import { ChannelIDType } from '@store/reducers/userReducer/types';
import PushNotification from 'react-native-push-notification';
import { call, cancel, put } from 'redux-saga/effects';

export function* createChannelSaga() {
  try {
    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      yield put(setModalMessageAction({ modalMessage: internetConnectionStatus }));

      yield cancel();
    }

    const getChannelID = () => messaging().getToken();
    const channelID: ChannelIDType = yield call(getChannelID);

    const createChannel = () => {
      PushNotification.createChannel(
        {
          channelDescription: 'A channel to categorise your notifications',
          channelId: channelID,
          channelName: 'Task notification channel',
          importance: 4,
          playSound: true,
          soundName: 'default',
          vibrate: true,
        },
        (created) => created,
        // callback returns whether the channel was created, false means it already existed.
      );
    };

    yield call(createChannel);

    yield put(setChannelIDAction({ channelID }));
  } catch (error) {
    if (error instanceof Error) {
      yield call(Sentry.captureException, error);
      yield put(setModalMessageAction({ modalMessage: error.message }));
    }
  }
}
