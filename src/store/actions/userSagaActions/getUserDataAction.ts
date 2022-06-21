import { USER_SAGA_ACTION } from '@enums/userSagaEnum';
import { UserDataType } from '@store/reducers/userReducer/types';

export type GetUserDataSagaActionPayloadType = {
  userData: UserDataType;
};

export type GetUserDataSagaActionReturnType = {
  type: USER_SAGA_ACTION.GET_USER_DATA;
  payload: GetUserDataSagaActionPayloadType;
};

export type GetUserDataSagaActionType = (
  payload: GetUserDataSagaActionPayloadType,
) => GetUserDataSagaActionReturnType;

export const getUserDataAction: GetUserDataSagaActionType = (payload) => ({
  type: USER_SAGA_ACTION.GET_USER_DATA,
  payload,
});
