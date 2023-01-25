import { TASKS_REDUCER_ACTION } from '@enums/tasksReducerEnum';
import { TaskListType } from '@store/reducers/tasksReducer/types';

type AddNewTaskActionPayloadType = {
  modifiedTaskList: TaskListType;
};

export type AddNewTaskActionReturnType = {
  type: TASKS_REDUCER_ACTION.ADD_NEW_TASK;
  payload: AddNewTaskActionPayloadType;
};

export type AddNewTaskActionType = (
  payload: AddNewTaskActionPayloadType,
) => AddNewTaskActionReturnType;

export const addNewTaskAction: AddNewTaskActionType = (
  payload,
): AddNewTaskActionReturnType => ({
  type: TASKS_REDUCER_ACTION.ADD_NEW_TASK,
  payload,
});
