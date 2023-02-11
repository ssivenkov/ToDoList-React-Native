import { TASKS_SAGA_ACTION } from '@enums/tasksSagaEnum';
import { SetStateType } from '@root/types/common/types';
import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';

export type DeleteTaskSagaPayloadType = {
  setIsLoading: SetStateType<boolean>;
  setModalVisible: SetStateType<boolean>;
  taskID: TaskType['id'];
  taskListID: TaskListType['id'];
};

export type DeleteTaskSagaActionReturnType = {
  payload: DeleteTaskSagaPayloadType;
  type: TASKS_SAGA_ACTION.DELETE_TASK;
};

export type DeleteTaskSagaActionType = (
  payload: DeleteTaskSagaPayloadType,
) => DeleteTaskSagaActionReturnType;

export const deleteTaskAction: DeleteTaskSagaActionType = (payload) => ({
  payload,
  type: TASKS_SAGA_ACTION.DELETE_TASK,
});
