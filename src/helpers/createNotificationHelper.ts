import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { t } from 'i18next';
import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';

type CreateNotificationHelperParamsType = {
  channelId: string;
  date: Date;
  notificationID: string;
  taskTitle: string;
};

export const createNotificationHelper = (params: CreateNotificationHelperParamsType) => {
  const { channelId, date, notificationID, taskTitle } = params;

  const message = `${t('notification.TaskNotification')} ${taskTitle}`;

  if (Platform.OS === 'android') {
    PushNotification.localNotificationSchedule({
      allowWhileIdle: true,
      channelId,
      date,
      id: notificationID,
      message,
    });
  }

  if (Platform.OS === 'ios') {
    PushNotificationIOS.addNotificationRequest({
      body: message,
      fireDate: date,
      id: notificationID,
    });
  }
};
