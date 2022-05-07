import {TASKS_ACTION} from '@enums/tasksEnum';
import {TaskListInterface} from '@store/reducers/tasksReducer/types';

type DeleteTaskListFromScreenActionPayloadType = {
  fullTaskList: TaskListInterface;
  deleteTodoTask: boolean;
  deleteDoneTask: boolean;
};

export type DeleteTaskListFromScreenActionReturnType = {
  type: TASKS_ACTION.DELETE_TASK_LIST_FROM_SCREEN;
  payload: DeleteTaskListFromScreenActionPayloadType;
};

export type AddNewTaskListActionType = (
  payload: DeleteTaskListFromScreenActionPayloadType,
) => DeleteTaskListFromScreenActionReturnType;

export const deleteTaskListFromScreenAction: AddNewTaskListActionType = (
  payload,
) => ({
  type: TASKS_ACTION.DELETE_TASK_LIST_FROM_SCREEN,
  payload,
});
