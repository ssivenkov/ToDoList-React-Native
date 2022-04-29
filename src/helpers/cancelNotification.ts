import PushNotification from 'react-native-push-notification';

export const cancelNotification = (notificationID: string) => {
  PushNotification.cancelLocalNotification(notificationID);
};
