import {Navigation} from '@navigation/Navigation';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {persistor, store} from '@store/store';
import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import PushNotification from 'react-native-push-notification';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';

export const App = () => {
  useEffect(() => {
    PushNotification.configure({
      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      requestPermissions: true,
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 200);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
};
