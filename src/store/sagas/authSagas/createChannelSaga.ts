import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import messaging from '@react-native-firebase/messaging';
import {errorAlert} from '@root/helpers/alertHelper';
import {hasInternetConnectionHelper} from '@root/helpers/hasInternetConnectionHelper';
import {setChannelIDAction} from '@store/actions/authReducerActions/setChannelIDAction';
import {ChannelIDType} from '@store/reducers/authReducer/types';
import {t} from 'i18next';
import PushNotification from 'react-native-push-notification';
import {call, put} from 'redux-saga/effects';

export function* createChannelSaga() {
  try {
    const connectionStatus: NetInfoState = yield NetInfo.fetch();

    if (!hasInternetConnectionHelper(connectionStatus)) {
      errorAlert(t('common.NoInternetConnection'));

      return;
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
        (created) => created, // callback returns whether the channel was created, false means it already existed.
      );
    };

    yield call(createChannel);
    yield put(setChannelIDAction({channelID}));
  } catch (error) {
    errorAlert(error);
  }
}
