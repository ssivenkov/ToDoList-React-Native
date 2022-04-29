import {t} from 'i18next';
import PushNotification from 'react-native-push-notification';

export const createNotificationHelper = (
  channelId: string,
  date: Date,
  id: string,
  taskTitle: string,
) => {
  const message: string = `${t('tasksScreen.TaskNotification')} ${taskTitle}`;

  PushNotification.localNotificationSchedule({
    channelId,
    date,
    id,
    message,
    allowWhileIdle: true,
  });
};
