import { USER_REDUCER_ACTION } from '@enums/userReducerEnum';
import { ProviderIDType } from '@store/reducers/userReducer/types';

type SetProviderIDActionPayloadType = {
  providerID: ProviderIDType;
};

export type SetProviderIDActionReturnType = {
  type: USER_REDUCER_ACTION.SET_PROVIDER_ID;
  payload: SetProviderIDActionPayloadType;
};

export type SetProviderIDActionType = (
  payload: SetProviderIDActionPayloadType,
) => SetProviderIDActionReturnType;

export const setProviderIDAction: SetProviderIDActionType = (payload) => ({
  type: USER_REDUCER_ACTION.SET_PROVIDER_ID,
  payload,
});
