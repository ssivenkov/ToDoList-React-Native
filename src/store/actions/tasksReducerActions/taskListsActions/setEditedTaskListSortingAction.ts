import { TASKS_REDUCER_ACTION } from '@enums/tasksReducerEnum';
import { TaskListType } from '@store/reducers/tasksReducer/types';

type EditTaskListSortingActionPayloadType = {
  editedTaskListSorting: TaskListType['sorting'];
  taskListID: TaskListType['id'];
};

export type EditTaskListSortingActionReturnType = {
  payload: EditTaskListSortingActionPayloadType;
  type: TASKS_REDUCER_ACTION.EDIT_TASK_LIST_SORTING;
};

export type EditTaskListSortingActionType = (
  payload: EditTaskListSortingActionPayloadType,
) => EditTaskListSortingActionReturnType;

export const setEditedTaskListSortingAction: EditTaskListSortingActionType = (
  payload,
) => ({
  payload,
  type: TASKS_REDUCER_ACTION.EDIT_TASK_LIST_SORTING,
});
