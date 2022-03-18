import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {ReturnComponentType} from './src/commonTypes/returnComponentType';
import {Navigation} from './src/navigation/Navigation';
import {persistor, store} from './src/store/store';

export const App = (): ReturnComponentType => {
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
