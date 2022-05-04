import {TASKS_ACTION} from '@enums/tasksEnum';
import {TaskListInterface} from '@store/reducers/tasksReducer/types';

type SetTaskListsActionPayloadType = {
  taskLists: TaskListInterface[];
};

export type SetTaskListsActionReturnType = {
  type: TASKS_ACTION.SET_TASK_LISTS;
  payload: SetTaskListsActionPayloadType;
};

export type SetTaskListsActionType = (
  payload: SetTaskListsActionPayloadType,
) => SetTaskListsActionReturnType;

export const setTaskListsAction: SetTaskListsActionType = (payload) => ({
  type: TASKS_ACTION.SET_TASK_LISTS,
  payload,
});
