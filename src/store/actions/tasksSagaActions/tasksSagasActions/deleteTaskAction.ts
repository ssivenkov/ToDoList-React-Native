import {TASKS_SAGA_ACTION} from '@enums/tasksSagaEnum';
import {SetStateType} from '@root/types/common/types';
import {TaskListInterface, TaskType} from '@store/reducers/tasksReducer/types';

export type DeleteTaskSagaPayloadType = {
  taskListId: TaskListInterface['id'];
  taskId: TaskType['id'];
  setIsLoading: SetStateType<boolean>;
  setModalVisible: SetStateType<boolean>;
};

export type DeleteTaskSagaActionReturnType = {
  type: TASKS_SAGA_ACTION.DELETE_TASK;
  payload: DeleteTaskSagaPayloadType;
};

export type DeleteTaskSagaActionType = (
  payload: DeleteTaskSagaPayloadType,
) => DeleteTaskSagaActionReturnType;

export const deleteTaskAction: DeleteTaskSagaActionType = (payload) => ({
  type: TASKS_SAGA_ACTION.DELETE_TASK,
  payload,
});
