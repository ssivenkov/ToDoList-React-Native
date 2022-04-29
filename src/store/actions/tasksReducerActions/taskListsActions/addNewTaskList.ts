import {TASKS_ACTIONS} from '@enums/tasksEnum';
import {TaskListInterface} from '@store/reducers/tasksReducer/types';

type DeleteTaskActionPayloadType = {
  taskList: TaskListInterface;
};

export type AddNewTaskListActionReturnType = {
  type: TASKS_ACTIONS.ADD_NEW_TASK_LIST;
  payload: DeleteTaskActionPayloadType;
};

export type AddNewTaskListActionType = (
  payload: DeleteTaskActionPayloadType,
) => AddNewTaskListActionReturnType;

export const addNewTaskList: AddNewTaskListActionType = (payload) => ({
  type: TASKS_ACTIONS.ADD_NEW_TASK_LIST,
  payload,
});
