import { USER_SAGA_ACTION } from '@enums/userSagaEnum';
import { SetStateType } from '@root/types/common/types';
import { LanguageType } from '@store/reducers/userReducer/types';

export type ChangeLanguageSagaActionPayloadType = {
  language: LanguageType;
  setIsLoading?: SetStateType<boolean>;
};

export type ChangeLanguageSagaActionReturnType = {
  type: USER_SAGA_ACTION.CHANGE_LANGUAGE;
  payload: ChangeLanguageSagaActionPayloadType;
};

export type ChangeLanguageSagaActionType = (
  payload: ChangeLanguageSagaActionPayloadType,
) => ChangeLanguageSagaActionReturnType;

export const changeLanguageAction: ChangeLanguageSagaActionType = (payload) => ({
  type: USER_SAGA_ACTION.CHANGE_LANGUAGE,
  payload,
});
