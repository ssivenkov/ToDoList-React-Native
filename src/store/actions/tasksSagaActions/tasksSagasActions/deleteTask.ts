import {TASKS_SAGA_ACTIONS} from '@enums/tasksSagaEnum';
import {SetStateType} from '@root/types/common/types';

export type DeleteTaskSagaPayloadType = {
  taskListId: string;
  taskId: string;
  setIsLoading: SetStateType<boolean>;
  setModalVisible: SetStateType<boolean>;
};

export type DeleteTaskSagaActionReturnType = {
  type: TASKS_SAGA_ACTIONS.DELETE_TASK;
  payload: DeleteTaskSagaPayloadType;
};

export type DeleteTaskSagaActionType = (
  payload: DeleteTaskSagaPayloadType,
) => DeleteTaskSagaActionReturnType;

export const deleteTask: DeleteTaskSagaActionType = (payload) => ({
  type: TASKS_SAGA_ACTIONS.DELETE_TASK,
  payload,
});
