import {t} from 'i18next';
import PushNotification from 'react-native-push-notification';

export const createNotification = (
  channelId: string,
  date: Date,
  id: string,
  taskTitle: string,
) => {
  PushNotification.localNotificationSchedule({
    channelId,
    date,
    id,
    message: `${t('tasksScreen.TaskNotification')} ${taskTitle}`,
    allowWhileIdle: true,
  });
};
