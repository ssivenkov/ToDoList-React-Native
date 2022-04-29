import {TASKS_SAGA_ACTIONS} from '@enums/tasksSagaEnum';
import {SetStateType} from '@root/types/common/types';
import {TaskListInterface} from '@store/reducers/tasksReducer/types';

export type DeleteTaskListFromScreenSagaPayloadType = {
  fullTaskList: TaskListInterface;
  deleteTodoTask: boolean;
  deleteDoneTask: boolean;
  setIsLoading: SetStateType<boolean>;
  setModalVisible: SetStateType<boolean>;
};

export type DeleteTaskListFromScreenSagaActionReturnType = {
  type: TASKS_SAGA_ACTIONS.DELETE_TASK_LIST_FROM_SCREEN;
  payload: DeleteTaskListFromScreenSagaPayloadType;
};

export type DeleteTaskListFromScreenSagaActionType = (
  payload: DeleteTaskListFromScreenSagaPayloadType,
) => DeleteTaskListFromScreenSagaActionReturnType;

export const deleteTaskListFromScreen: DeleteTaskListFromScreenSagaActionType =
  (payload) => ({
    type: TASKS_SAGA_ACTIONS.DELETE_TASK_LIST_FROM_SCREEN,
    payload,
  });
