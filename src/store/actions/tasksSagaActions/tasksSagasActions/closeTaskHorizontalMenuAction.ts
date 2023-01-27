import { TASKS_SAGA_ACTION } from '@enums/tasksSagaEnum';

export type CloseTaskHorizontalMenuSagaActionReturnType = {
  type: TASKS_SAGA_ACTION.CLOSE_TASK_HORIZONTAL_MENU;
};

export type CloseTaskHorizontalMenuActionType =
  () => CloseTaskHorizontalMenuSagaActionReturnType;

export const closeTaskHorizontalMenuAction: CloseTaskHorizontalMenuActionType = () => ({
  type: TASKS_SAGA_ACTION.CLOSE_TASK_HORIZONTAL_MENU,
});
