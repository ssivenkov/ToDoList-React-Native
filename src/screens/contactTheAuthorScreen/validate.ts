import {
  emailField,
  messageField,
} from '@root/screens/contactTheAuthorScreen/fieldNames';
import { t } from 'i18next';

import { ValidationParamsType, ValuesType } from './types';

export const validate = (params: ValidationParamsType) => {
  const { values, isFormValid, setIsFormValid } = params;

  const errors: ValuesType = { [emailField]: '', [messageField]: '' };

  if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,}$/i.test(values[emailField])) {
    errors[emailField] = t('contactTheAuthorScreen.InvalidEmailError');
  }

  if (!values[emailField]) {
    errors[emailField] = t('contactTheAuthorScreen.EmailRequiredError');
  }

  if (!values[messageField]) {
    errors[messageField] = t('contactTheAuthorScreen.MessageRequiredError');
  }

  if (Object.values(errors).some((errorMessage) => errorMessage.length >= 1)) {
    setIsFormValid(false);

    return errors;
  } else {
    if (!isFormValid) {
      setIsFormValid(true);
    }

    return {};
  }
};
