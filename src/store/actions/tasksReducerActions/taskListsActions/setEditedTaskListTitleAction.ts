import {TASKS_ACTIONS} from '@enums/tasksEnum';
import {TaskListInterface} from '@store/reducers/tasksReducer/types';

type EditTaskListTitleActionPayloadType = {
  taskListId: TaskListInterface['id'];
  editedTaskListTitle: TaskListInterface['title'];
};

export type EditTaskListTitleActionReturnType = {
  type: TASKS_ACTIONS.EDIT_TASK_LIST_TITLE;
  payload: EditTaskListTitleActionPayloadType;
};

export type EditTaskListTitleActionType = (
  payload: EditTaskListTitleActionPayloadType,
) => EditTaskListTitleActionReturnType;

export const setEditedTaskListTitleAction: EditTaskListTitleActionType = (
  payload,
) => ({
  type: TASKS_ACTIONS.EDIT_TASK_LIST_TITLE,
  payload,
});
