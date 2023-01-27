import { TASKS_REDUCER_ACTION } from '@enums/tasksReducerEnum';
import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';

type SetTaskIsDoneActionPayloadType = {
  doneTaskID: TaskType['id'];
  taskListID: TaskListType['id'];
};

export type SetTaskIsDoneActionReturnType = {
  payload: SetTaskIsDoneActionPayloadType;
  type: TASKS_REDUCER_ACTION.SET_TASK_DONE;
};

export type SetTaskIsDoneActionType = (
  payload: SetTaskIsDoneActionPayloadType,
) => SetTaskIsDoneActionReturnType;

export const setTaskIsDoneAction: SetTaskIsDoneActionType = (payload) => ({
  payload,
  type: TASKS_REDUCER_ACTION.SET_TASK_DONE,
});
