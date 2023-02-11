import { TASKS_REDUCER_ACTION } from '@enums/tasksReducerEnum';
import { TaskListType } from '@store/reducers/tasksReducer/types';

type DeleteTaskActionPayloadType = {
  taskList: TaskListType;
};

export type AddNewTaskListActionReturnType = {
  payload: DeleteTaskActionPayloadType;
  type: TASKS_REDUCER_ACTION.ADD_NEW_TASK_LIST;
};

export type AddNewTaskListActionType = (
  payload: DeleteTaskActionPayloadType,
) => AddNewTaskListActionReturnType;

export const addNewTaskListAction: AddNewTaskListActionType = (payload) => ({
  payload,
  type: TASKS_REDUCER_ACTION.ADD_NEW_TASK_LIST,
});
