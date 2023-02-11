import { SnackBarReducerStateType } from '@store/reducers/snackBarReducer/types';
import { AppRootStateType } from '@store/types';

export const snackBarEventSelector = (
  state: AppRootStateType,
): SnackBarReducerStateType['event'] => {
  return state.snackBarEvents.event;
};
