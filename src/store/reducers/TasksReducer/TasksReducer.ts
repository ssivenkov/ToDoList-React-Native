import {TASKS_ACTIONS} from '../../../enums/TasksEnum';
import {InitialTasksStateType} from 'store/reducers/TasksReducer/Types';
import {TasksActionsType} from 'store/actions/TasksActions/Types';

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
