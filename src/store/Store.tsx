import {combineReducers, createStore} from 'redux';
import {tasksReducer} from './reducers/TasksReducer';
import {SetTasksActionsType} from '../types/actions/TaskActionsTypes';
import {DoneTasksActionsType} from '../types/actions/DoneTasksActionsType';
import {doneTasksReducer} from './reducers/DoneTaskReducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  doneTasks: doneTasksReducer,
});

export const store = createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppRootActionsType = SetTasksActionsType | DoneTasksActionsType;
