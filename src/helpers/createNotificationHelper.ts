import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {t} from 'i18next';
import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';

type createNotificationHelperPropsType = {
  channelId: string;
  date: Date;
  notificationID: string;
  taskTitle: string;
};

export const createNotificationHelper = (
  params: createNotificationHelperPropsType,
) => {
  const {channelId, date, notificationID, taskTitle} = params;
  const message = `${t('tasksScreen.TaskNotification')} ${taskTitle}`;

  if (Platform.OS === 'android') {
    PushNotification.localNotificationSchedule({
      channelId,
      date,
      id: notificationID,
      message,
      allowWhileIdle: true,
    });
  }

  if (Platform.OS === 'ios') {
    PushNotificationIOS.addNotificationRequest({
      id: notificationID,
      fireDate: date,
      body: message,
    });
  }
};
