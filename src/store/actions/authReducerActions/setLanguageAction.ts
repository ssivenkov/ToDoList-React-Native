import {AUTH_REDUCER_ACTION} from '@enums/authReducerEnum';
import {LanguageType} from '@store/reducers/authReducer/types';

type SetLanguageActionPayloadType = {
  language: LanguageType;
};

export type SetLanguageActionReturnType = {
  type: AUTH_REDUCER_ACTION.SET_LANGUAGE;
  payload: SetLanguageActionPayloadType;
};

export type SetLanguageActionType = (
  payload: SetLanguageActionPayloadType,
) => SetLanguageActionReturnType;

export const setLanguageAction: SetLanguageActionType = (payload) => ({
  type: AUTH_REDUCER_ACTION.SET_LANGUAGE,
  payload,
});
