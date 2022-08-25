import AsyncStorage from '@react-native-async-storage/async-storage';
import { tasksReducer } from '@store/reducers/tasksReducer/tasksReducer';
import { userReducer } from '@store/reducers/userReducer/userReducer';
import { rootWatcher } from '@store/sagas/rootWatcher';
import { AppRootStateType, RootStateType } from '@store/types';
import { applyMiddleware, combineReducers, createStore /*, compose*/ } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import createSagaMiddleware from 'redux-saga';

export const rootReducer = combineReducers<RootStateType>({
  tasks: tasksReducer,
  user: userReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  StateReconciler: autoMergeLevel2,
};

/*declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}*/

const persistedReducer = persistReducer<AppRootStateType>(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware),
  /*composeEnhancers(applyMiddleware(sagaMiddleware)),*/
);

sagaMiddleware.run(rootWatcher);

export const persistor = persistStore(store);
