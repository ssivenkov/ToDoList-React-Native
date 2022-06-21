import { TASKS_REDUCER_ACTION } from '@enums/tasksReducerEnum';
import { TaskListInterface, TaskType } from '@store/reducers/tasksReducer/types';

type SetTaskIsDoneActionPayloadType = {
  taskListID: TaskListInterface['id'];
  doneTaskID: TaskType['id'];
};

export type SetTaskIsDoneActionReturnType = {
  type: TASKS_REDUCER_ACTION.SET_TASK_DONE;
  payload: SetTaskIsDoneActionPayloadType;
};

export type SetTaskIsDoneActionType = (
  payload: SetTaskIsDoneActionPayloadType,
) => SetTaskIsDoneActionReturnType;

export const setTaskIsDoneAction: SetTaskIsDoneActionType = (payload) => ({
  type: TASKS_REDUCER_ACTION.SET_TASK_DONE,
  payload,
});
