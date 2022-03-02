import React from 'react';
import {AppComponent} from './src/components/AppComponent';
import {Provider} from 'react-redux';
import {store} from './src/store/Store';
import {ReturnComponentType} from './src/types/common/ReturnComponentType';

export const App = (): ReturnComponentType => {
  return (
    <Provider store={store}>
      <AppComponent />
    </Provider>
  );
};
