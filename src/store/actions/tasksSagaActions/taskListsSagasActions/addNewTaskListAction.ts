import { TASKS_SAGA_ACTION } from '@enums/tasksSagaEnum';
import { SetStateType } from '@root/types/common/types';
import { TaskListWithoutTasksType } from '@store/reducers/tasksReducer/types';

export type AddNewTaskListSagaPayloadType = {
  taskList: TaskListWithoutTasksType;
  setIsLoading: SetStateType<boolean>;
  setModalVisible: SetStateType<boolean>;
  setTaskListTitle: SetStateType<string>;
};

export type AddNewTaskListSagaActionReturnType = {
  type: TASKS_SAGA_ACTION.ADD_NEW_TASK_LIST;
  payload: AddNewTaskListSagaPayloadType;
};

export type AddNewTaskListActionType = (
  payload: AddNewTaskListSagaPayloadType,
) => AddNewTaskListSagaActionReturnType;

export const addNewTaskListAction: AddNewTaskListActionType = (payload) => ({
  type: TASKS_SAGA_ACTION.ADD_NEW_TASK_LIST,
  payload,
});
