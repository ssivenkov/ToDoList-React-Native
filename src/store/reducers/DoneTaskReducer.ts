import {DONE_TASKS_ACTIONS} from '../../enums/DoneTaskEnum';
import {DoneTasksActionsType} from 'types/actions/DoneTasksActionsType';
import {InitialDoneTasksStateType} from 'types/reducers/DoneTasksReducerTypes';

const initialDoneTasksState = {
  doneTasks: [],
};

export const doneTasksReducer = (
  state: InitialDoneTasksStateType = initialDoneTasksState,
  action: DoneTasksActionsType,
) => {
  switch (action.type) {
    case DONE_TASKS_ACTIONS.SET_DONE_TASKS:
      return {...state};
    default:
      return state;
  }
};
