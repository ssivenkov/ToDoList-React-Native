import AsyncStorage from '@react-native-async-storage/async-storage';
import {signInReducer} from '@store/reducers/signInReducer/signInReducer';
import {taskListReducer} from '@store/reducers/taskListReducer/taskListReducer';
import {rootWatcher} from '@store/sagas/rootWatcher';
import {
  applyMiddleware,
  combineReducers,
  createStore,
  /*, compose*/
} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import createSagaMiddleware from 'redux-saga';

const rootReducer = combineReducers({
  taskLists: taskListReducer,
  signIn: signInReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  StateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
/*const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;*/
export const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware),
  /*composeEnhancers(applyMiddleware(sagaMiddleware)),*/
);
sagaMiddleware.run(rootWatcher);
export const persistor = persistStore(store);
export type AppRootStateType = ReturnType<typeof rootReducer>;
