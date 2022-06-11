import {USER_REDUCER_ACTION} from '@enums/userReducerEnum';
import {ErrorModalMessageType} from '@store/reducers/userReducer/types';

type SetErrorModalMessageActionPayloadType = {
  errorModalMessage: ErrorModalMessageType;
};

export type SetErrorModalMessageActionReturnType = {
  type: USER_REDUCER_ACTION.SET_ERROR_MODAL_MESSAGE;
  payload: SetErrorModalMessageActionPayloadType;
};

export type SetErrorModalMessageActionType = (
  payload: SetErrorModalMessageActionPayloadType,
) => SetErrorModalMessageActionReturnType;

export const setModalErrorMessageAction: SetErrorModalMessageActionType = (
  payload,
) => ({
  type: USER_REDUCER_ACTION.SET_ERROR_MODAL_MESSAGE,
  payload,
});
