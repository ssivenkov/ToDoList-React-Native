import {t} from 'i18next';
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

  PushNotification.localNotificationSchedule({
    channelId,
    date,
    id: notificationID,
    message,
    allowWhileIdle: true,
  });
};
