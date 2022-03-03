import {combineReducers, createStore} from 'redux';
import {tasksReducer} from './reducers/TasksReducer/TasksReducer';
import {SetTasksActionsType} from 'store/actions/TasksActions/Types';
import {Type} from 'store/actions/DoneTasksActions/Type';
import {doneTasksReducer} from './reducers/DoneTaskReducer/DoneTaskReducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  doneTasks: doneTasksReducer,
});

export const store = createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppRootActionsType = SetTasksActionsType | Type;
