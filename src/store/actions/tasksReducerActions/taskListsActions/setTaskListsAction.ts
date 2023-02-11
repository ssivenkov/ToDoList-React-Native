import { TASKS_REDUCER_ACTION } from '@enums/tasksReducerEnum';
import { TaskListType } from '@store/reducers/tasksReducer/types';

type SetTaskListsActionPayloadType = {
  taskLists: TaskListType[];
};

export type SetTaskListsActionReturnType = {
  payload: SetTaskListsActionPayloadType;
  type: TASKS_REDUCER_ACTION.SET_TASK_LISTS;
};

export type SetTaskListsActionType = (
  payload: SetTaskListsActionPayloadType,
) => SetTaskListsActionReturnType;

export const setTaskListsAction: SetTaskListsActionType = (payload) => ({
  payload,
  type: TASKS_REDUCER_ACTION.SET_TASK_LISTS,
});
