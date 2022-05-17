import messaging from '@react-native-firebase/messaging';

export const requestIOSNotificationsPermissionHelper = async () => {
  const authStatus = await messaging().requestPermission();
  const authorized = authStatus === messaging.AuthorizationStatus.AUTHORIZED;
  const provisional = authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  return authorized || provisional;
};
