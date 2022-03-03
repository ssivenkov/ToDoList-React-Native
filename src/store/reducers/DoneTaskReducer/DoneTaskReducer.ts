import {DONE_TASKS_ACTIONS} from '../../../enums/DoneTaskEnum';
import {Type} from 'store/actions/DoneTasksActions/Type';
import {InitialDoneTasksStateType} from 'store/reducers/DoneTaskReducer/Types';

const initialDoneTasksState = {
  doneTasks: [],
};

export const doneTasksReducer = (
  state: InitialDoneTasksStateType = initialDoneTasksState,
  action: Type,
) => {
  switch (action.type) {
    case DONE_TASKS_ACTIONS.SET_DONE_TASKS:
      return {...state};
    default:
      return state;
  }
};
