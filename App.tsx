import {Navigation} from '@navigation/Navigation';
import {persistor, store} from '@store/store';
import React, {useEffect} from 'react';
import {LogBox, StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';

export const App = () => {
  LogBox.ignoreLogs([
    'Sending `onAnimatedValueUpdate` with no listeners registered.',
  ]);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 200);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle="light-content" />
        <Navigation />
      </PersistGate>
    </Provider>
  );
};
