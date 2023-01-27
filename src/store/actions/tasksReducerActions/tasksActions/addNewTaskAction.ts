import { TASKS_REDUCER_ACTION } from '@enums/tasksReducerEnum';
import { TaskListType } from '@store/reducers/tasksReducer/types';

type AddNewTaskActionPayloadType = {
  modifiedTaskList: TaskListType;
};

export type AddNewTaskActionReturnType = {
  payload: AddNewTaskActionPayloadType;
  type: TASKS_REDUCER_ACTION.ADD_NEW_TASK;
};

export type AddNewTaskActionType = (
  payload: AddNewTaskActionPayloadType,
) => AddNewTaskActionReturnType;

export const addNewTaskAction: AddNewTaskActionType = (
  payload,
): AddNewTaskActionReturnType => ({
  payload,
  type: TASKS_REDUCER_ACTION.ADD_NEW_TASK,
});
