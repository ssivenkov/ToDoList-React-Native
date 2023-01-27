import { USER_REDUCER_ACTION } from '@enums/userReducerEnum';
import { UserReducerStateType } from '@store/reducers/userReducer/types';

type SetIsUserDataSynchronizedActionPayloadType = {
  isUserDataSynchronized: UserReducerStateType['isUserDataSynchronized'];
};

export type SetIsUserDataSynchronizedActionReturnType = {
  payload: SetIsUserDataSynchronizedActionPayloadType;
  type: USER_REDUCER_ACTION.SET_IS_USER_DATA_SYNCHRONIZED;
};

export type SetIsUserDataSynchronizedActionType = (
  payload: SetIsUserDataSynchronizedActionPayloadType,
) => SetIsUserDataSynchronizedActionReturnType;

export const setIsUserDataSynchronizedAction: SetIsUserDataSynchronizedActionType = (
  payload,
) => ({
  payload,
  type: USER_REDUCER_ACTION.SET_IS_USER_DATA_SYNCHRONIZED,
});
