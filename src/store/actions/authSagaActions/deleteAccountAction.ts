import {AUTH_SAGA_ACTION} from '@enums/authSagaEnum';
import {SetStateType} from '@root/types/common/types';

export type DeleteAccountSagaActionPayloadType = {
  setWaitingProcess: SetStateType<boolean>;
};

export type DeleteAccountSagaActionReturnType = {
  type: AUTH_SAGA_ACTION.DELETE_ACCOUNT;
  payload: DeleteAccountSagaActionPayloadType;
};

export type DeleteAccountSagaActionType = (
  payload: DeleteAccountSagaActionPayloadType,
) => DeleteAccountSagaActionReturnType;

export const deleteAccountAction: DeleteAccountSagaActionType = (payload) => ({
  type: AUTH_SAGA_ACTION.DELETE_ACCOUNT,
  payload,
});
