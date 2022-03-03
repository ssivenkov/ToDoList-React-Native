import {TASKS_ACTIONS} from 'enums/TasksEnum';
import {SetTasksActionsType} from 'store/actions/TasksActions/Types';

export const setTasks = (tasks: Array<any>): SetTasksActionsType =>
  ({type: TASKS_ACTIONS.SET_TASKS, tasks} as const);
