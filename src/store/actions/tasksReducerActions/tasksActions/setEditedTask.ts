import {TASKS_ACTIONS} from '@enums/tasksEnum';

type SetEditedTaskActionPayloadType = {
  taskListId: string;
  taskId: string;
  editedTaskTitle: string;
};

export type SetEditedTaskActionReturnType = {
  type: TASKS_ACTIONS.EDIT_TASK_TITLE;
  payload: SetEditedTaskActionPayloadType;
};

export type SetEditedTaskActionType = (
  payload: SetEditedTaskActionPayloadType,
) => SetEditedTaskActionReturnType;

export const setEditedTask: SetEditedTaskActionType = (payload) => ({
  type: TASKS_ACTIONS.EDIT_TASK_TITLE,
  payload,
});
