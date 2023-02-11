import { TASKS_SAGA_ACTION } from '@enums/tasksSagaEnum';
import { SetStateType } from '@root/types/common/types';

export type WaitCloseTaskHorizontalMenuSagaPayloadType = {
  setIsMenuHorizontalVisible: SetStateType<boolean>;
};

export type WaitCloseTaskHorizontalMenuSagaActionReturnType = {
  payload: WaitCloseTaskHorizontalMenuSagaPayloadType;
  type: TASKS_SAGA_ACTION.WAIT_CLOSE_TASK_HORIZONTAL_MENU;
};

export type WaitCloseTaskHorizontalMenuActionType = (
  payload: WaitCloseTaskHorizontalMenuSagaPayloadType,
) => WaitCloseTaskHorizontalMenuSagaActionReturnType;

export const waitCloseTaskHorizontalMenuAction: WaitCloseTaskHorizontalMenuActionType = (
  payload,
) => ({
  payload,
  type: TASKS_SAGA_ACTION.WAIT_CLOSE_TASK_HORIZONTAL_MENU,
});
