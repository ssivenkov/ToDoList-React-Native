// intl-pluralrules is polyfill for previous JSON format which used in i18next
import 'intl-pluralrules';
import { SENTRY_DSN } from '@env';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import * as Sentry from '@sentry/react-native';
import { AppRegistry } from 'react-native';
import PushNotification from 'react-native-push-notification';

import { name as appName } from './app.json';
import { App } from './src/App';

import './src/languages/i18n';

if (!__DEV__) {
  Sentry.init({
    dsn: SENTRY_DSN,
  });
}

PushNotification.configure({
  onNotification: function (notification) {
    // eslint-disable-next-line import/no-named-as-default-member
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  popInitialNotification: true,
  requestPermissions: false,
});

AppRegistry.registerComponent(appName, () => App);
