import AsyncStorage from '@react-native-async-storage/async-storage';
import {SignInActionsType} from '@store/actions/signInActions/type';
import {TaskListActionsType} from '@store/actions/tasksActions/types';
import {signInReducer} from '@store/reducers/signInReducer/signInReducer';
import {taskListReducer} from '@store/reducers/taskListReducer/taskListReducer';
import {
  /*applyMiddleware, */
  combineReducers,
  createStore,
  /*, compose*/
} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {
  /*thunk,*/
  ThunkAction,
} from 'redux-thunk';

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
/*const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;*/
export const store = createStore(
  persistedReducer,
  /*composeEnhancers(applyMiddleware(thunk)),*/
);
export const persistor = persistStore(store);
export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppRootActionsType = TaskListActionsType | SignInActionsType;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppRootActionsType
>;
