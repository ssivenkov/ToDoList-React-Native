import { SetStateType } from '@root/types/common/types';

import { emailField, messageField } from './fieldNames';

export type ValuesType = {
  [emailField]: string;
  [messageField]: string;
};

export type ValidationParamsType = {
  isFormValid: boolean;
  setIsFormValid: SetStateType<boolean>;
  values: ValuesType;
};

export type SendMessageResponseDataType = {
  next: string;
  ok: boolean;
};
