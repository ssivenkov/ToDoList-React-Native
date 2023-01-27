import { USER_SAGA_ACTION } from '@enums/userSagaEnum';
import { UserDataType } from '@store/reducers/userReducer/types';

export type GetUserDataSagaActionPayloadType = {
  userData: UserDataType;
};

export type GetUserDataSagaActionReturnType = {
  payload: GetUserDataSagaActionPayloadType;
  type: USER_SAGA_ACTION.GET_USER_DATA;
};

export type GetUserDataSagaActionType = (
  payload: GetUserDataSagaActionPayloadType,
) => GetUserDataSagaActionReturnType;

export const getUserDataAction: GetUserDataSagaActionType = (payload) => ({
  payload,
  type: USER_SAGA_ACTION.GET_USER_DATA,
});
