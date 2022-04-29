import {TASKS_SAGA_ACTIONS} from '@enums/tasksSagaEnum';
import {SetStateType} from '@root/types/common/types';
import {TaskListWithTaskType} from '@store/reducers/tasksReducer/types';

export type AddNewTaskListSagaPayloadType = {
  newTaskList: TaskListWithTaskType;
  setIsLoading: SetStateType<boolean>;
  setModalVisible: SetStateType<boolean>;
  setNewTaskListTitle: SetStateType<string>;
};

export type AddNewTaskListSagaActionReturnType = {
  type: TASKS_SAGA_ACTIONS.ADD_NEW_TASK_LIST;
  payload: AddNewTaskListSagaPayloadType;
};

export type AddNewTaskListActionType = (
  payload: AddNewTaskListSagaPayloadType,
) => AddNewTaskListSagaActionReturnType;

export const addNewTaskList: AddNewTaskListActionType = (payload) => ({
  type: TASKS_SAGA_ACTIONS.ADD_NEW_TASK_LIST,
  payload,
});
