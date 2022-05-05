import {TASKS_ACTION} from '@enums/tasksEnum';
import {TaskListInterface} from '@store/reducers/tasksReducer/types';

type EditTaskListTitleActionPayloadType = {
  taskListID: TaskListInterface['id'];
  editedTaskListTitle: TaskListInterface['title'];
};

export type EditTaskListTitleActionReturnType = {
  type: TASKS_ACTION.EDIT_TASK_LIST_TITLE;
  payload: EditTaskListTitleActionPayloadType;
};

export type EditTaskListTitleActionType = (
  payload: EditTaskListTitleActionPayloadType,
) => EditTaskListTitleActionReturnType;

export const setEditedTaskListTitleAction: EditTaskListTitleActionType = (
  payload,
) => ({
  type: TASKS_ACTION.EDIT_TASK_LIST_TITLE,
  payload,
});
