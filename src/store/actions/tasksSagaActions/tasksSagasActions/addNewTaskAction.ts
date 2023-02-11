import { TASKS_SAGA_ACTION } from '@enums/tasksSagaEnum';
import { Nullable, SetStateType } from '@root/types/common/types';
import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';

export type AddNewTaskSagaPayloadType = {
  date: Nullable<Date>;
  goBack: () => void;
  modifiedTaskList: TaskListType;
  newTask: TaskType;
  setButtonDisabled: SetStateType<boolean>;
  setIsNotificationSwitcherOn: SetStateType<boolean>;
  setLoading: SetStateType<boolean>;
  setNewTaskTitle: SetStateType<string>;
  shouldCreateNotification: boolean;
};

export type AddNewTaskSagaActionReturnType = {
  payload: AddNewTaskSagaPayloadType;
  type: TASKS_SAGA_ACTION.ADD_NEW_TASK;
};

export type AddNewTaskSagaActionType = (
  payload: AddNewTaskSagaPayloadType,
) => AddNewTaskSagaActionReturnType;

export const addNewTaskAction: AddNewTaskSagaActionType = (payload) => ({
  payload,
  type: TASKS_SAGA_ACTION.ADD_NEW_TASK,
});
