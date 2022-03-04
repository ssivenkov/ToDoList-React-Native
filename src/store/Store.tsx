import {combineReducers, createStore} from 'redux';
import {tasksReducer} from './reducers/tasksReducer/TasksReducer';
import {SetTasksActionsType} from 'store/actions/TasksActions/Types';
import {Type} from 'store/actions/signInActions/Type';
import {signInReducer} from './reducers/signInReducer/SignInReducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  signIn: signInReducer,
});

export const store = createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppRootActionsType = SetTasksActionsType | Type;
