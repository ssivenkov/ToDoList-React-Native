import { TASKS_REDUCER_ACTION } from '@enums/tasksReducerEnum';
import { TaskListInterface } from '@store/reducers/tasksReducer/types';

type EditTaskListTitleActionPayloadType = {
  taskListID: TaskListInterface['id'];
  editedTaskListTitle: TaskListInterface['title'];
};

export type EditTaskListTitleActionReturnType = {
  type: TASKS_REDUCER_ACTION.EDIT_TASK_LIST_TITLE;
  payload: EditTaskListTitleActionPayloadType;
};

export type EditTaskListTitleActionType = (
  payload: EditTaskListTitleActionPayloadType,
) => EditTaskListTitleActionReturnType;

export const setEditedTaskListTitleAction: EditTaskListTitleActionType = (payload) => ({
  type: TASKS_REDUCER_ACTION.EDIT_TASK_LIST_TITLE,
  payload,
});
