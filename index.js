import PushNotificationIOS from '@react-native-community/push-notification-ios';
import 'intl-pluralrules';
// intl-pluralrules is polyfill for previous JSON format which used in i18next
import {AppRegistry} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {App} from './App';
import {name as appName} from './app.json';
import i18n from './languages/i18n';

PushNotification.configure({
  onNotification: function (notification) {
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  popInitialNotification: true,
  requestPermissions: false,
});

AppRegistry.registerComponent(appName, () => App);
