import { TASKS_REDUCER_ACTION } from '@enums/tasksReducerEnum';
import { TaskListType } from '@store/reducers/tasksReducer/types';

type EditTaskListTitleActionPayloadType = {
  editedTaskListTitle: TaskListType['title'];
  taskListID: TaskListType['id'];
};

export type EditTaskListTitleActionReturnType = {
  payload: EditTaskListTitleActionPayloadType;
  type: TASKS_REDUCER_ACTION.EDIT_TASK_LIST_TITLE;
};

export type EditTaskListTitleActionType = (
  payload: EditTaskListTitleActionPayloadType,
) => EditTaskListTitleActionReturnType;

export const setEditedTaskListTitleAction: EditTaskListTitleActionType = (payload) => ({
  payload,
  type: TASKS_REDUCER_ACTION.EDIT_TASK_LIST_TITLE,
});
