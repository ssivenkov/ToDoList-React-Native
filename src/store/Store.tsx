import {combineReducers, createStore} from 'redux';
import {taskListReducer} from './reducers/taskListReducer/taskListReducer';
import {TaskListActionsType} from 'store/actions/TasksActions/Types';
import {SignInActionsType} from 'store/actions/signInActions/Type';
import {signInReducer} from './reducers/signInReducer/SignInReducer';

const rootReducer = combineReducers({
  taskLists: taskListReducer,
  signIn: signInReducer,
});

export const store = createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppRootActionsType = TaskListActionsType | SignInActionsType;
