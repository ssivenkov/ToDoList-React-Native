import {TASKS_SAGA_ACTION} from '@enums/tasksSagaEnum';
import {Nullable, SetStateType} from '@root/types/common/types';
import {TaskListInterface, TaskType} from '@store/reducers/tasksReducer/types';

export type AddNewTaskSagaPayloadType = {
  modifiedTaskList: TaskListInterface;
  taskListId: TaskListInterface['id'];
  newTask: TaskType;
  shouldCreateNotification: boolean;
  date: Nullable<Date>;
  setIsLoading: SetStateType<boolean>;
  setModalVisible: SetStateType<boolean>;
  setNewTaskTitle: SetStateType<string>;
  setIsOn: SetStateType<boolean>;
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
