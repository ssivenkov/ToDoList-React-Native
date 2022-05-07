import PushNotification from 'react-native-push-notification';

export const cancelNotificationHelper = (notificationID: string) => {
  PushNotification.cancelLocalNotification(notificationID);
};

// cancelNotification
