import {TASKS_ACTIONS} from '@root/enums/tasksEnum';
import {
  TaskListInterface,
  TaskListWithTaskType,
} from '@store/reducers/tasksReducer/types';

type AddNewTaskActionPayloadType = {
  modifiedTaskList: TaskListInterface;
  taskListId: TaskListWithTaskType['id'];
};

export type AddNewTaskActionReturnType = {
  type: TASKS_ACTIONS.ADD_NEW_TASK;
  payload: AddNewTaskActionPayloadType;
};

export type AddNewTaskActionType = (
  payload: AddNewTaskActionPayloadType,
) => AddNewTaskActionReturnType;

export const addNewTask: AddNewTaskActionType = (
  payload,
): AddNewTaskActionReturnType => ({
  type: TASKS_ACTIONS.ADD_NEW_TASK,
  payload,
});
