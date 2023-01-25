import { TASKS_REDUCER_ACTION } from '@enums/tasksReducerEnum';
import { TaskListType } from '@store/reducers/tasksReducer/types';

type DeleteTaskListFromScreenActionPayloadType = {
  fullTaskList: TaskListType;
  deleteTodoTask: boolean;
  deleteDoneTask: boolean;
};

export type DeleteTaskListFromScreenActionReturnType = {
  type: TASKS_REDUCER_ACTION.DELETE_TASK_LIST_FROM_SCREEN;
  payload: DeleteTaskListFromScreenActionPayloadType;
};

export type AddNewTaskListActionType = (
  payload: DeleteTaskListFromScreenActionPayloadType,
) => DeleteTaskListFromScreenActionReturnType;

export const deleteTaskListFromScreenAction: AddNewTaskListActionType = (payload) => ({
  type: TASKS_REDUCER_ACTION.DELETE_TASK_LIST_FROM_SCREEN,
  payload,
});
