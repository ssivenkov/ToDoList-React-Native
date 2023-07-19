import { TASKS_SAGA_ACTION } from '@enums/tasksSagaEnum';
import { SetStateType } from '@root/types/common/types';
import { TaskListWithoutTasksType } from '@store/reducers/tasksReducer/types';

export type AddNewTaskListSagaPayloadType = {
  setIsLoading: SetStateType<boolean>;
  setModalVisible: SetStateType<boolean>;
  setTaskListTitle: SetStateType<string>;
  taskList: TaskListWithoutTasksType;
};

export type AddNewTaskListSagaActionReturnType = {
  payload: AddNewTaskListSagaPayloadType;
  type: TASKS_SAGA_ACTION.ADD_NEW_TASK_LIST;
};

export type AddNewTaskListSagaActionType = (
  payload: AddNewTaskListSagaPayloadType,
) => AddNewTaskListSagaActionReturnType;

export const addNewTaskListAction: AddNewTaskListSagaActionType = (payload) => ({
  payload,
  type: TASKS_SAGA_ACTION.ADD_NEW_TASK_LIST,
});
