import {AUTH_SAGA_ACTION} from '@enums/authSagaEnum';
import {LanguageType} from '@store/reducers/authReducer/types';

export type ChangeLanguageSagaActionPayloadType = {
  language: LanguageType;
};

export type ChangeLanguageSagaActionReturnType = {
  type: AUTH_SAGA_ACTION.CHANGE_LANGUAGE;
  payload: ChangeLanguageSagaActionPayloadType;
};

export type ChangeLanguageSagaActionType = (
  payload: ChangeLanguageSagaActionPayloadType,
) => ChangeLanguageSagaActionReturnType;

export const changeLanguageAction: ChangeLanguageSagaActionType = (
  payload,
) => ({
  type: AUTH_SAGA_ACTION.CHANGE_LANGUAGE,
  payload,
});
