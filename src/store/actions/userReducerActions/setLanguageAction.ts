import { USER_REDUCER_ACTION } from '@enums/userReducerEnum';
import { LanguageType } from '@store/reducers/userReducer/types';

type SetLanguageActionPayloadType = {
  language: LanguageType;
};

export type SetLanguageActionReturnType = {
  payload: SetLanguageActionPayloadType;
  type: USER_REDUCER_ACTION.SET_LANGUAGE;
};

export type SetLanguageActionType = (
  payload: SetLanguageActionPayloadType,
) => SetLanguageActionReturnType;

export const setLanguageAction: SetLanguageActionType = (payload) => ({
  payload,
  type: USER_REDUCER_ACTION.SET_LANGUAGE,
});
