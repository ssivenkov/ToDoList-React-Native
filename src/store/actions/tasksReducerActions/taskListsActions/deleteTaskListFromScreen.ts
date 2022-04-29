import {TASKS_ACTIONS} from '@enums/tasksEnum';
import {TaskListInterface} from '@store/reducers/tasksReducer/types';

type DeleteTaskListFromScreenActionPayloadType = {
  fullTaskList: TaskListInterface;
  deleteTodoTask: boolean;
  deleteDoneTask: boolean;
};

export type DeleteTaskListFromScreenActionReturnType = {
  type: TASKS_ACTIONS.DELETE_TASK_LIST_FROM_SCREEN;
  payload: DeleteTaskListFromScreenActionPayloadType;
};

export type AddNewTaskListActionType = (
  payload: DeleteTaskListFromScreenActionPayloadType,
) => DeleteTaskListFromScreenActionReturnType;

export const deleteTaskListFromScreen: AddNewTaskListActionType = (
  payload,
) => ({
  type: TASKS_ACTIONS.DELETE_TASK_LIST_FROM_SCREEN,
  payload,
});
