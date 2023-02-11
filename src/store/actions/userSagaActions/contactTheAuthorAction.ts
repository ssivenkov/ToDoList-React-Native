import { USER_SAGA_ACTION } from '@enums/userSagaEnum';
import { SetStateType } from '@root/types/common/types';
import { ValuesType } from '@screens/contactTheAuthorScreen/types';

export type ContactTheAuthorSagaSagaActionPayloadType = {
  navigate: () => void;
  setSubmitting: SetStateType<boolean>;
  values: ValuesType;
};

export type ContactTheAuthorSagaSagaActionReturnType = {
  payload: ContactTheAuthorSagaSagaActionPayloadType;
  type: USER_SAGA_ACTION.CONTACT_THE_AUTHOR;
};

export type ContactTheAuthorSagaActionType = (
  payload: ContactTheAuthorSagaSagaActionPayloadType,
) => ContactTheAuthorSagaSagaActionReturnType;

export const contactTheAuthorAction: ContactTheAuthorSagaActionType = (payload) => ({
  payload,
  type: USER_SAGA_ACTION.CONTACT_THE_AUTHOR,
});
