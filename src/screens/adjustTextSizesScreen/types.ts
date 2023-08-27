import { UserReducerStateType } from '@store/reducers/userReducer/types';

export type TextSizesStateType = {
  modalButtonTextSize: UserReducerStateType['modalButtonTextSize'];
  modalWindowTextSize: UserReducerStateType['modalWindowTextSize'];
  notepadTextSize: UserReducerStateType['notepadTextSize'];
  taskListTitleSize: UserReducerStateType['taskListTitleSize'];
  taskTextSize: UserReducerStateType['taskTextSize'];
};
