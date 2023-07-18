import { USER_SAGA_ACTION } from '@enums/userSagaEnum';
import { SetStateType } from '@root/types/common/types';
import { UserReducerStateType } from '@store/reducers/userReducer/types';

export type ChangeTextSizesSagaPayloadType = {
  goBack: () => void;
  modalButtonTextSize: UserReducerStateType['modalButtonTextSize'];
  modalWindowTextSize: UserReducerStateType['modalWindowTextSize'];
  notepadTextSize: UserReducerStateType['notepadTextSize'];
  setButtonDisabled: SetStateType<boolean>;
  setLoading: SetStateType<boolean>;
  taskListTitleSize: UserReducerStateType['taskListTitleSize'];
  taskTextSize: UserReducerStateType['taskTextSize'];
};

export type ChangeTextSizesSagaActionReturnType = {
  payload: ChangeTextSizesSagaPayloadType;
  type: USER_SAGA_ACTION.CHANGE_TEXT_SIZES;
};

export type ChangeTextSizesSagaActionType = (
  payload: ChangeTextSizesSagaPayloadType,
) => ChangeTextSizesSagaActionReturnType;

export const changeTextSizesAction: ChangeTextSizesSagaActionType = (payload) => ({
  payload,
  type: USER_SAGA_ACTION.CHANGE_TEXT_SIZES,
});
