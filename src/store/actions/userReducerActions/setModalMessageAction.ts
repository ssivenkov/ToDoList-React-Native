import { USER_REDUCER_ACTION } from '@enums/userReducerEnum';
import { ModalMessageType } from '@store/reducers/userReducer/types';

type SetModalMessageActionPayloadType = {
  modalMessage: ModalMessageType;
};

export type SetModalMessageActionReturnType = {
  payload: SetModalMessageActionPayloadType;
  type: USER_REDUCER_ACTION.SET_MODAL_MESSAGE;
};

export type SetModalMessageActionType = (
  payload: SetModalMessageActionPayloadType,
) => SetModalMessageActionReturnType;

export const setModalMessageAction: SetModalMessageActionType = (payload) => ({
  payload,
  type: USER_REDUCER_ACTION.SET_MODAL_MESSAGE,
});
