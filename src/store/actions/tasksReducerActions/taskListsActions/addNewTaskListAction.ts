import {TASKS_REDUCER_ACTION} from '@enums/tasksReducerEnum';
import {TaskListInterface} from '@store/reducers/tasksReducer/types';

type DeleteTaskActionPayloadType = {
  taskList: TaskListInterface;
};

export type AddNewTaskListActionReturnType = {
  type: TASKS_REDUCER_ACTION.ADD_NEW_TASK_LIST;
  payload: DeleteTaskActionPayloadType;
};

export type AddNewTaskListActionType = (
  payload: DeleteTaskActionPayloadType,
) => AddNewTaskListActionReturnType;

export const addNewTaskListAction: AddNewTaskListActionType = (payload) => ({
  type: TASKS_REDUCER_ACTION.ADD_NEW_TASK_LIST,
  payload,
});
