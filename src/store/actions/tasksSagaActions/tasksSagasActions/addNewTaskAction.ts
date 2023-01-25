import { TASKS_SAGA_ACTION } from '@enums/tasksSagaEnum';
import { Nullable, SetStateType } from '@root/types/common/types';
import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';

export type AddNewTaskSagaPayloadType = {
  modifiedTaskList: TaskListType;
  newTask: TaskType;
  shouldCreateNotification: boolean;
  date: Nullable<Date>;
  setLoading: SetStateType<boolean>;
  setButtonDisabled: SetStateType<boolean>;
  goBack: () => void;
  setNewTaskTitle: SetStateType<string>;
  setIsNotificationSwitcherOn: SetStateType<boolean>;
};

export type AddNewTaskSagaActionReturnType = {
  type: TASKS_SAGA_ACTION.ADD_NEW_TASK;
  payload: AddNewTaskSagaPayloadType;
};

export type AddNewTaskSagaActionType = (
  payload: AddNewTaskSagaPayloadType,
) => AddNewTaskSagaActionReturnType;

export const addNewTaskAction: AddNewTaskSagaActionType = (payload) => ({
  type: TASKS_SAGA_ACTION.ADD_NEW_TASK,
  payload,
});
