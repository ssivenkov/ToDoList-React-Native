import { TASKS_SAGA_ACTION } from '@enums/tasksSagaEnum';
import { SetStateType } from '@root/types/common/types';
import { TaskListInterface } from '@store/reducers/tasksReducer/types';

export type DeleteTaskListFullSagaPayloadType = {
  taskListID: TaskListInterface['id'];
  setIsLoading: SetStateType<boolean>;
  setModalVisible: SetStateType<boolean>;
};

export type DeleteTaskListFullSagaActionReturnType = {
  type: TASKS_SAGA_ACTION.DELETE_TASK_LIST_FULL;
  payload: DeleteTaskListFullSagaPayloadType;
};

export type DeleteTaskListFullSagaActionType = (
  payload: DeleteTaskListFullSagaPayloadType,
) => DeleteTaskListFullSagaActionReturnType;

export const deleteTaskListFullAction: DeleteTaskListFullSagaActionType = (payload) => ({
  type: TASKS_SAGA_ACTION.DELETE_TASK_LIST_FULL,
  payload,
});
