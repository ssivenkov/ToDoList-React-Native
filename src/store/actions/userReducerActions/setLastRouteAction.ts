import { USER_REDUCER_ACTION } from '@enums/userReducerEnum';
import { LastRouteType } from '@store/reducers/userReducer/types';

type SetLastRouteActionPayloadType = {
  lastRoute: LastRouteType;
};

export type SetLastRouteActionReturnType = {
  payload: SetLastRouteActionPayloadType;
  type: USER_REDUCER_ACTION.SET_LAST_ROUTE;
};

export type SetLastRouteActionType = (
  payload: SetLastRouteActionPayloadType,
) => SetLastRouteActionReturnType;

export const setLastRouteAction: SetLastRouteActionType = (payload) => ({
  payload,
  type: USER_REDUCER_ACTION.SET_LAST_ROUTE,
});
