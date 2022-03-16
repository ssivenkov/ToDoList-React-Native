import React from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {Navigation} from './src/components/navigation/Navigation';
import {persistor, store} from './src/store/Store';
import {ReturnComponentType} from './src/types/common/ReturnComponentType';

export const App = (): ReturnComponentType => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
};
