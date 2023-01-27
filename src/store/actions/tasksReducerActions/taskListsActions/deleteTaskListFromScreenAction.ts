import { TASKS_REDUCER_ACTION } from '@enums/tasksReducerEnum';
import { TaskListType } from '@store/reducers/tasksReducer/types';

type DeleteTaskListFromScreenActionPayloadType = {
  deleteDoneTask: boolean;
  deleteTodoTask: boolean;
  fullTaskList: TaskListType;
};

export type DeleteTaskListFromScreenActionReturnType = {
  payload: DeleteTaskListFromScreenActionPayloadType;
  type: TASKS_REDUCER_ACTION.DELETE_TASK_LIST_FROM_SCREEN;
};

export type AddNewTaskListActionType = (
  payload: DeleteTaskListFromScreenActionPayloadType,
) => DeleteTaskListFromScreenActionReturnType;

export const deleteTaskListFromScreenAction: AddNewTaskListActionType = (payload) => ({
  payload,
  type: TASKS_REDUCER_ACTION.DELETE_TASK_LIST_FROM_SCREEN,
});
