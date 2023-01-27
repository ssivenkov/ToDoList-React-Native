import { TASKS_REDUCER_ACTION } from '@enums/tasksReducerEnum';
import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';

type DeleteTaskActionPayloadType = {
  taskID: TaskType['id'];
  taskListID: TaskListType['id'];
};

export type DeleteTaskActionReturnType = {
  payload: DeleteTaskActionPayloadType;
  type: TASKS_REDUCER_ACTION.DELETE_TASK;
};

export type DeleteTaskActionType = (
  payload: DeleteTaskActionPayloadType,
) => DeleteTaskActionReturnType;

export const deleteTaskAction: DeleteTaskActionType = (payload) => ({
  payload,
  type: TASKS_REDUCER_ACTION.DELETE_TASK,
});
