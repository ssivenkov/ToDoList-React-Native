import {t} from 'i18next';
import PushNotification from 'react-native-push-notification';

type createNotificationHelperPropsType = {
  channelId: string;
  date: Date;
  notificationID: string;
  taskTitle: string;
};

export const createNotificationHelper = (
  props: createNotificationHelperPropsType,
) => {
  const {channelId, date, notificationID, taskTitle} = props;
  const message: string = `${t('tasksScreen.TaskNotification')} ${taskTitle}`;

  PushNotification.localNotificationSchedule({
    channelId,
    date,
    id: notificationID,
    message,
    allowWhileIdle: true,
  });
};
