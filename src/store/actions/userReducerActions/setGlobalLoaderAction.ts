import { USER_REDUCER_ACTION } from '@enums/userReducerEnum';
import { UserReducerStateType } from '@store/reducers/userReducer/types';

type SetGlobalLoaderActionPayloadType = {
  globalLoader: UserReducerStateType['globalLoader'];
};

export type SetGlobalLoaderActionReturnType = {
  payload: SetGlobalLoaderActionPayloadType;
  type: USER_REDUCER_ACTION.SET_GLOBAL_LOADER;
};

export type SetGlobalLoaderActionType = (
  payload: SetGlobalLoaderActionPayloadType,
) => SetGlobalLoaderActionReturnType;

export const setGlobalLoaderAction: SetGlobalLoaderActionType = (payload) => ({
  payload,
  type: USER_REDUCER_ACTION.SET_GLOBAL_LOADER,
});
