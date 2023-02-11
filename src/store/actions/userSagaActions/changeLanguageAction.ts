import { USER_SAGA_ACTION } from '@enums/userSagaEnum';
import { SetStateType } from '@root/types/common/types';
import { LanguageType } from '@store/reducers/userReducer/types';

export type ChangeLanguageSagaActionPayloadType = {
  language: LanguageType;
  setIsLoading?: SetStateType<boolean>;
};

export type ChangeLanguageSagaActionReturnType = {
  payload: ChangeLanguageSagaActionPayloadType;
  type: USER_SAGA_ACTION.CHANGE_LANGUAGE;
};

export type ChangeLanguageSagaActionType = (
  payload: ChangeLanguageSagaActionPayloadType,
) => ChangeLanguageSagaActionReturnType;

export const changeLanguageAction: ChangeLanguageSagaActionType = (payload) => ({
  payload,
  type: USER_SAGA_ACTION.CHANGE_LANGUAGE,
});
