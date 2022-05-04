import {TASKS_ACTION} from '@root/enums/tasksEnum';
import {
  TaskListInterface,
  TaskListWithTaskType,
} from '@store/reducers/tasksReducer/types';

type AddNewTaskActionPayloadType = {
  modifiedTaskList: TaskListInterface;
  taskListId: TaskListWithTaskType['id'];
};

export type AddNewTaskActionReturnType = {
  type: TASKS_ACTION.ADD_NEW_TASK;
  payload: AddNewTaskActionPayloadType;
};

export type AddNewTaskActionType = (
  payload: AddNewTaskActionPayloadType,
) => AddNewTaskActionReturnType;

export const addNewTaskAction: AddNewTaskActionType = (
  payload,
): AddNewTaskActionReturnType => ({
  type: TASKS_ACTION.ADD_NEW_TASK,
  payload,
});
