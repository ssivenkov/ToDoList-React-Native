import {TASKS_SAGA_ACTIONS} from '@enums/tasksSagaEnum';
import {SetStateType} from '@root/types/common/types';

export type DeleteTaskListFullSagaPayloadType = {
  taskListId: string;
  setIsLoading: SetStateType<boolean>;
  setModalVisible: SetStateType<boolean>;
};

export type DeleteTaskListFullSagaActionReturnType = {
  type: TASKS_SAGA_ACTIONS.DELETE_TASK_LIST_FULL;
  payload: DeleteTaskListFullSagaPayloadType;
};

export type DeleteTaskListFullSagaActionType = (
  payload: DeleteTaskListFullSagaPayloadType,
) => DeleteTaskListFullSagaActionReturnType;

export const deleteTaskListFullAction: DeleteTaskListFullSagaActionType = (
  payload,
) => ({
  type: TASKS_SAGA_ACTIONS.DELETE_TASK_LIST_FULL,
  payload,
});
