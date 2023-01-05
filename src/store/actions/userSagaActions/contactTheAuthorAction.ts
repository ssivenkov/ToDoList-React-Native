import { USER_SAGA_ACTION } from '@enums/userSagaEnum';
import { SetStateType } from '@root/types/common/types';
import { ValuesType } from '@screens/contactTheAuthorScreen/types';

export type ContactTheAuthorSagaSagaActionPayloadType = {
  values: ValuesType;
  navigate: () => void;
  setIsSubmitting: SetStateType<boolean>;
};

export type ContactTheAuthorSagaSagaActionReturnType = {
  type: USER_SAGA_ACTION.CONTACT_THE_AUTHOR;
  payload: ContactTheAuthorSagaSagaActionPayloadType;
};

export type ContactTheAuthorSagaActionType = (
  payload: ContactTheAuthorSagaSagaActionPayloadType,
) => ContactTheAuthorSagaSagaActionReturnType;

export const contactTheAuthorAction: ContactTheAuthorSagaActionType = (payload) => ({
  type: USER_SAGA_ACTION.CONTACT_THE_AUTHOR,
  payload,
});
