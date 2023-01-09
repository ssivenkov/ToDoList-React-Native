import { USER_REDUCER_ACTION } from '@enums/userReducerEnum';
import { ModalMessageType } from '@store/reducers/userReducer/types';

type SetModalMessageActionPayloadType = {
  modalMessage: ModalMessageType;
};

export type SetModalMessageActionReturnType = {
  type: USER_REDUCER_ACTION.SET_MODAL_MESSAGE;
  payload: SetModalMessageActionPayloadType;
};

export type SetModalMessageActionType = (
  payload: SetModalMessageActionPayloadType,
) => SetModalMessageActionReturnType;

export const setModalMessageAction: SetModalMessageActionType = (payload) => ({
  type: USER_REDUCER_ACTION.SET_MODAL_MESSAGE,
  payload,
});
