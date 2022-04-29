import {TASKS_ACTIONS} from '@enums/tasksEnum';

type EditTaskListTitleActionPayloadType = {
  taskListId: string;
  editedTaskListTitle: string;
};

export type EditTaskListTitleActionReturnType = {
  type: TASKS_ACTIONS.EDIT_TASK_LIST_TITLE;
  payload: EditTaskListTitleActionPayloadType;
};

export type EditTaskListTitleActionType = (
  payload: EditTaskListTitleActionPayloadType,
) => EditTaskListTitleActionReturnType;

export const setEditedTaskListTitle: EditTaskListTitleActionType = (
  payload,
) => ({
  type: TASKS_ACTIONS.EDIT_TASK_LIST_TITLE,
  payload,
});
