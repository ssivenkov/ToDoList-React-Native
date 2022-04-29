import {TASKS_ACTIONS} from '@enums/tasksEnum';
import {TaskListInterface, TaskType} from '@store/reducers/tasksReducer/types';

type DeleteTaskActionPayloadType = {
  taskListId: TaskListInterface['id'];
  taskId: TaskType['id'];
};

export type DeleteTaskActionReturnType = {
  type: TASKS_ACTIONS.DELETE_TASK;
  payload: DeleteTaskActionPayloadType;
};

export type DeleteTaskActionType = (
  payload: DeleteTaskActionPayloadType,
) => DeleteTaskActionReturnType;

export const deleteTaskAction: DeleteTaskActionType = (payload) => ({
  type: TASKS_ACTIONS.DELETE_TASK,
  payload,
});
