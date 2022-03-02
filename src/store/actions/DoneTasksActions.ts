import {DONE_TASKS_ACTIONS} from '../../enums/DoneTaskEnum';
import {SetDoneTasksActionsType} from 'types/actions/DoneTasksActionsType';

export const setTasks = (doneTasks: Array<any>): SetDoneTasksActionsType =>
  ({type: DONE_TASKS_ACTIONS.SET_DONE_TASKS, doneTasks} as const);
