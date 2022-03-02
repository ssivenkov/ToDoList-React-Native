import {TASKS_ACTIONS} from '../../enums/TasksEnum';
import {InitialTasksStateType} from 'types/reducers/TasksReducerTypes';
import {TasksActionsType} from 'types/actions/TaskActionsTypes';

const initialTasksState: InitialTasksStateType = {
  tasks: [{key: 'task 1'}, {key: 'task 2'}, {key: 'task 3'}],
};

export const tasksReducer = (
  state: InitialTasksStateType = initialTasksState,
  action: TasksActionsType,
) => {
  switch (action.type) {
    case TASKS_ACTIONS.SET_TASKS:
      return {...state};
    default:
      return state;
  }
};
