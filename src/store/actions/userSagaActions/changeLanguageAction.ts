import {USER_SAGA_ACTION} from '@enums/userSagaEnum';
import {LanguageType} from '@store/reducers/userReducer/types';

export type ChangeLanguageSagaActionPayloadType = {
  language: LanguageType;
};

export type ChangeLanguageSagaActionReturnType = {
  type: USER_SAGA_ACTION.CHANGE_LANGUAGE;
  payload: ChangeLanguageSagaActionPayloadType;
};

export type ChangeLanguageSagaActionType = (
  payload: ChangeLanguageSagaActionPayloadType,
) => ChangeLanguageSagaActionReturnType;

export const changeLanguageAction: ChangeLanguageSagaActionType = (
  payload,
) => ({
  type: USER_SAGA_ACTION.CHANGE_LANGUAGE,
  payload,
});
