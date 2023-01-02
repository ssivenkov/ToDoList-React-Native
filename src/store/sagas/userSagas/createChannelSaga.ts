import { ONLINE } from '@constants/constants';
import messaging from '@react-native-firebase/messaging';
import { checkInternetConnectionHelper } from '@root/helpers/checkInternetConnectionHelper';
import * as Sentry from '@sentry/react-native';
import { setChannelIDAction } from '@store/actions/userReducerActions/setChannelIDAction';
import { setModalErrorMessageAction } from '@store/actions/userReducerActions/setModalErrorMessageAction';
import { ChannelIDType } from '@store/reducers/userReducer/types';
import PushNotification from 'react-native-push-notification';
import { call, cancel, put } from 'redux-saga/effects';

export function* createChannelSaga() {
  try {
    const internetConnectionStatus: string = yield call(checkInternetConnectionHelper);

    if (internetConnectionStatus !== ONLINE) {
      yield put(
        setModalErrorMessageAction({ errorModalMessage: internetConnectionStatus }),
      );

      yield cancel();
    }

    const getChannelID = () => messaging().getToken();
    const channelID: ChannelIDType = yield call(getChannelID);
    const createChannel = () => {
      PushNotification.createChannel(
        {
          channelId: channelID,
          channelName: 'Task notification channel',
          channelDescription: 'A channel to categorise your notifications',
          playSound: true,
          soundName: 'default',
          importance: 4,
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
      yield put(setModalErrorMessageAction({ errorModalMessage: error.message }));
    }
  }
}
