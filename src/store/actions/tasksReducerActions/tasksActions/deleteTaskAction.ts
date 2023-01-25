import { TASKS_REDUCER_ACTION } from '@enums/tasksReducerEnum';
import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';

type DeleteTaskActionPayloadType = {
  taskListID: TaskListType['id'];
  taskID: TaskType['id'];
};

export type DeleteTaskActionReturnType = {
  type: TASKS_REDUCER_ACTION.DELETE_TASK;
  payload: DeleteTaskActionPayloadType;
};

export type DeleteTaskActionType = (
  payload: DeleteTaskActionPayloadType,
) => DeleteTaskActionReturnType;

export const deleteTaskAction: DeleteTaskActionType = (payload) => ({
  type: TASKS_REDUCER_ACTION.DELETE_TASK,
  payload,
});
