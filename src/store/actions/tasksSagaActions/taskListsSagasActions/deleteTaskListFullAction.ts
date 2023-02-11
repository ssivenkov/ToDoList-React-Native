import { TASKS_SAGA_ACTION } from '@enums/tasksSagaEnum';
import { SetStateType } from '@root/types/common/types';
import { TaskListType } from '@store/reducers/tasksReducer/types';

export type DeleteTaskListFullSagaPayloadType = {
  setIsLoading: SetStateType<boolean>;
  setModalVisible: SetStateType<boolean>;
  taskListID: TaskListType['id'];
};

export type DeleteTaskListFullSagaActionReturnType = {
  payload: DeleteTaskListFullSagaPayloadType;
  type: TASKS_SAGA_ACTION.DELETE_TASK_LIST_FULL;
};

export type DeleteTaskListFullSagaActionType = (
  payload: DeleteTaskListFullSagaPayloadType,
) => DeleteTaskListFullSagaActionReturnType;

export const deleteTaskListFullAction: DeleteTaskListFullSagaActionType = (payload) => ({
  payload,
  type: TASKS_SAGA_ACTION.DELETE_TASK_LIST_FULL,
});
