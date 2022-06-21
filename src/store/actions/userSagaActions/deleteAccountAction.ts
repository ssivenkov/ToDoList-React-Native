import { USER_SAGA_ACTION } from '@enums/userSagaEnum';
import { SetStateType } from '@root/types/common/types';

export type DeleteAccountSagaActionPayloadType = {
  setWaitingProcess: SetStateType<boolean>;
};

export type DeleteAccountSagaActionReturnType = {
  type: USER_SAGA_ACTION.DELETE_ACCOUNT;
  payload: DeleteAccountSagaActionPayloadType;
};

export type DeleteAccountSagaActionType = (
  payload: DeleteAccountSagaActionPayloadType,
) => DeleteAccountSagaActionReturnType;

export const deleteAccountAction: DeleteAccountSagaActionType = (payload) => ({
  type: USER_SAGA_ACTION.DELETE_ACCOUNT,
  payload,
});
