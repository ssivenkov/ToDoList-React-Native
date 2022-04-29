import {TASKS_ACTIONS} from '@enums/tasksEnum';
import {TaskListInterface} from '@store/reducers/tasksReducer/types';

type SetTaskListsActionPayloadType = {
  taskLists: TaskListInterface[];
};

export type SetTaskListsActionReturnType = {
  type: TASKS_ACTIONS.SET_TASK_LISTS;
  payload: SetTaskListsActionPayloadType;
};

export type SetTaskListsActionType = (
  payload: SetTaskListsActionPayloadType,
) => SetTaskListsActionReturnType;

export const setTaskLists: SetTaskListsActionType = (payload) => ({
  type: TASKS_ACTIONS.SET_TASK_LISTS,
  payload,
});
