import {TASKS_ACTION} from '@enums/tasksEnum';
import {TaskListInterface, TaskType} from '@store/reducers/tasksReducer/types';

type SetTaskIsDoneActionPayloadType = {
  taskListId: TaskListInterface['id'];
  doneTaskId: TaskType['id'];
};

export type SetTaskIsDoneActionReturnType = {
  type: TASKS_ACTION.SET_TASK_DONE;
  payload: SetTaskIsDoneActionPayloadType;
};

export type SetTaskIsDoneActionType = (
  payload: SetTaskIsDoneActionPayloadType,
) => SetTaskIsDoneActionReturnType;

export const setTaskIsDoneAction: SetTaskIsDoneActionType = (payload) => ({
  type: TASKS_ACTION.SET_TASK_DONE,
  payload,
});
