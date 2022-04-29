import {TASKS_SAGA_ACTIONS} from '@enums/tasksSagaEnum';
import {SetStateType} from '@root/types/common/types';
import {TaskListInterface, TaskType} from '@store/reducers/tasksReducer/types';

export type SetTaskIsDoneSagaPayloadType = {
  taskListId: TaskListInterface['id'];
  doneTaskId: TaskType['id'];
  setIsLoading: SetStateType<boolean>;
  setModalVisible: SetStateType<boolean>;
};

export type SetTaskIsDoneSagaActionReturnType = {
  type: TASKS_SAGA_ACTIONS.SET_TASK_IS_DONE;
  payload: SetTaskIsDoneSagaPayloadType;
};

export type SetTaskIsDoneSagaActionType = (
  payload: SetTaskIsDoneSagaPayloadType,
) => SetTaskIsDoneSagaActionReturnType;

export const setTaskIsDoneAction: SetTaskIsDoneSagaActionType = (payload) => ({
  type: TASKS_SAGA_ACTIONS.SET_TASK_IS_DONE,
  payload,
});
