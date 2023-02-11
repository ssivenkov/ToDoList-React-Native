import { TASKS_SAGA_ACTION } from '@enums/tasksSagaEnum';
import { SetStateType } from '@root/types/common/types';
import { TaskListType } from '@store/reducers/tasksReducer/types';

export type DeleteTaskListFromScreenSagaPayloadType = {
  deleteDoneTask: boolean;
  deleteTodoTask: boolean;
  fullTaskList: TaskListType;
  setIsLoading: SetStateType<boolean>;
  setModalVisible: SetStateType<boolean>;
};

export type DeleteTaskListFromScreenSagaActionReturnType = {
  payload: DeleteTaskListFromScreenSagaPayloadType;
  type: TASKS_SAGA_ACTION.DELETE_TASK_LIST_FROM_SCREEN;
};

export type DeleteTaskListFromScreenSagaActionType = (
  payload: DeleteTaskListFromScreenSagaPayloadType,
) => DeleteTaskListFromScreenSagaActionReturnType;

export const deleteTaskListFromScreenAction: DeleteTaskListFromScreenSagaActionType = (
  payload,
) => ({
  payload,
  type: TASKS_SAGA_ACTION.DELETE_TASK_LIST_FROM_SCREEN,
});
