import { TASKS_REDUCER_ACTION } from '@enums/tasksReducerEnum';
import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';

type SetTaskIsDoneActionPayloadType = {
  taskListID: TaskListType['id'];
  toDoTaskID: TaskType['id'];
};

export type SetTaskIsDoneActionReturnType = {
  payload: SetTaskIsDoneActionPayloadType;
  type: TASKS_REDUCER_ACTION.SET_TASK_IS_DONE;
};

export type SetTaskIsDoneActionType = (
  payload: SetTaskIsDoneActionPayloadType,
) => SetTaskIsDoneActionReturnType;

export const setTaskIsDoneAction: SetTaskIsDoneActionType = (payload) => ({
  payload,
  type: TASKS_REDUCER_ACTION.SET_TASK_IS_DONE,
});
