import { SNACK_BAR_REDUCER_ACTION } from '@enums/snackBarReducerEnum';
import {
  SnackBarReducerActionsType,
  SnackBarReducerStateType,
} from '@store/reducers/snackBarReducer/types';

const snackBarReducerState: SnackBarReducerStateType = {
  event: null,
};

export const snackBarReducer = (
  state = snackBarReducerState,
  action: SnackBarReducerActionsType,
): SnackBarReducerStateType => {
  switch (action.type) {
    case SNACK_BAR_REDUCER_ACTION.ADD_EVENT:
      return {
        ...state,
        event: action.payload.event,
      };

    case SNACK_BAR_REDUCER_ACTION.DELETE_EVENT:
      return {
        ...state,
        event: null,
      };

    default:
      return state;
  }
};
