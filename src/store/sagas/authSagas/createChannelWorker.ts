import messaging from '@react-native-firebase/messaging';
import {errorAlert} from '@root/helpers/alert';
import {setChannelID} from '@store/actions/authReducerActions/setChannelID';
import PushNotification from 'react-native-push-notification';
import {call, put} from 'redux-saga/effects';

export function* createChannelWorker() {
  try {
    const getChannelID = () => {
      return messaging().getToken();
    };
    const channelID: string = yield call(getChannelID);
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
        (created) => created, // callback returns whether the channel was created, false means it already existed.
      );
    };

    yield call(createChannel);
    yield put(setChannelID({channelID}));
  } catch (error) {
    if (error instanceof Error) {
      errorAlert(error);
    }
  }
}
