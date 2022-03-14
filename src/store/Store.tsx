import {combineReducers, createStore} from 'redux';
import {TaskListActionsType} from 'store/actions/TasksActions/Types';
import {SignInActionsType} from 'store/actions/signInActions/Type';
import {signInReducer} from './reducers/signInReducer/SignInReducer';
import {taskListReducer} from './reducers/taskListReducer/taskListReducer';

const rootReducer = combineReducers({
  taskLists: taskListReducer,
  signIn: signInReducer,
});

export const store = createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppRootActionsType = TaskListActionsType | SignInActionsType;
