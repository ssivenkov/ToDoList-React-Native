import { USER_REDUCER_ACTION } from '@enums/userReducerEnum';
import { ProviderIDType } from '@store/reducers/userReducer/types';

type SetProviderIDActionPayloadType = {
  providerID: ProviderIDType;
};

export type SetProviderIDActionReturnType = {
  payload: SetProviderIDActionPayloadType;
  type: USER_REDUCER_ACTION.SET_PROVIDER_ID;
};

export type SetProviderIDActionType = (
  payload: SetProviderIDActionPayloadType,
) => SetProviderIDActionReturnType;

export const setProviderIDAction: SetProviderIDActionType = (payload) => ({
  payload,
  type: USER_REDUCER_ACTION.SET_PROVIDER_ID,
});
