import {
  emailField,
  messageField,
} from '@root/screens/contactTheAuthorScreen/fieldNames';
import { SetStateType } from '@root/types/common/types';

export type ValuesType = {
  [emailField]: string;
  [messageField]: string;
};

export type ValidationParamsType = {
  values: ValuesType;
  isFormValid: boolean;
  setIsFormValid: SetStateType<boolean>;
};

export type SendMessageResponseDataType = {
  next: string;
  ok: boolean;
};
