import { USER_REDUCER_ACTION } from '@enums/userReducerEnum';
import { UserReducerStateType } from '@store/reducers/userReducer/types';

type SetIsUserDataSynchronizedActionPayloadType = {
  isUserDataSynchronized: UserReducerStateType['isUserDataSynchronized'];
};

export type SetIsUserDataSynchronizedActionReturnType = {
  type: USER_REDUCER_ACTION.SET_IS_USER_DATA_SYNCHRONIZED;
  payload: SetIsUserDataSynchronizedActionPayloadType;
};

export type SetIsUserDataSynchronizedActionType = (
  payload: SetIsUserDataSynchronizedActionPayloadType,
) => SetIsUserDataSynchronizedActionReturnType;

export const setIsUserDataSynchronizedAction: SetIsUserDataSynchronizedActionType = (
  payload,
) => ({
  type: USER_REDUCER_ACTION.SET_IS_USER_DATA_SYNCHRONIZED,
  payload,
});
