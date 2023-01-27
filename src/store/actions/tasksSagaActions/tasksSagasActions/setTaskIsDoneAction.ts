import { TASKS_SAGA_ACTION } from '@enums/tasksSagaEnum';
import { SetStateType } from '@root/types/common/types';
import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';

export type SetTaskIsDoneSagaPayloadType = {
  doneTaskID: TaskType['id'];
  setIsLoading: SetStateType<boolean>;
  setModalVisible: SetStateType<boolean>;
  taskListID: TaskListType['id'];
};

export type SetTaskIsDoneSagaActionReturnType = {
  payload: SetTaskIsDoneSagaPayloadType;
  type: TASKS_SAGA_ACTION.SET_TASK_IS_DONE;
};

export type SetTaskIsDoneSagaActionType = (
  payload: SetTaskIsDoneSagaPayloadType,
) => SetTaskIsDoneSagaActionReturnType;

export const setTaskIsDoneAction: SetTaskIsDoneSagaActionType = (payload) => ({
  payload,
  type: TASKS_SAGA_ACTION.SET_TASK_IS_DONE,
});
