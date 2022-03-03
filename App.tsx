import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store/Store';
import {ReturnComponentType} from './src/types/common/ReturnComponentType';
import {Navigation} from './src/components/navigation/Navigation';
import 'react-native-gesture-handler';

export const App = (): ReturnComponentType => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};
