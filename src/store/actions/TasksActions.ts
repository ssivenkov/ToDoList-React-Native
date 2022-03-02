import {TASKS_ACTIONS} from '../../enums/TasksEnum';
import {SetTasksActionsType} from 'types/actions/TaskActionsTypes';

export const setTasks = (tasks: Array<any>): SetTasksActionsType =>
  ({type: TASKS_ACTIONS.SET_TASKS, tasks} as const);
