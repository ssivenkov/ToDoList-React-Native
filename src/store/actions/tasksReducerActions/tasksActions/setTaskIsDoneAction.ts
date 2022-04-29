import {TASKS_ACTIONS} from '@enums/tasksEnum';

type SetTaskIsDoneActionPayloadType = {
  taskListId: string;
  doneTaskId: string;
};

export type SetTaskIsDoneActionReturnType = {
  type: TASKS_ACTIONS.SET_TASK_DONE;
  payload: SetTaskIsDoneActionPayloadType;
};

export type SetTaskIsDoneActionType = (
  payload: SetTaskIsDoneActionPayloadType,
) => SetTaskIsDoneActionReturnType;

export const setTaskIsDoneAction: SetTaskIsDoneActionType = (payload) => ({
  type: TASKS_ACTIONS.SET_TASK_DONE,
  payload,
});
