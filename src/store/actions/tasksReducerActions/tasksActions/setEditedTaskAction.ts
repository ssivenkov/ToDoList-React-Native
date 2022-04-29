import {TASKS_ACTIONS} from '@enums/tasksEnum';
import {TaskListInterface, TaskType} from '@store/reducers/tasksReducer/types';

type SetEditedTaskActionPayloadType = {
  taskListId: TaskListInterface['id'];
  taskId: TaskType['id'];
  editedTaskTitle: TaskType['title'];
};

export type SetEditedTaskActionReturnType = {
  type: TASKS_ACTIONS.EDIT_TASK_TITLE;
  payload: SetEditedTaskActionPayloadType;
};

export type SetEditedTaskActionType = (
  payload: SetEditedTaskActionPayloadType,
) => SetEditedTaskActionReturnType;

export const setEditedTaskAction: SetEditedTaskActionType = (payload) => ({
  type: TASKS_ACTIONS.EDIT_TASK_TITLE,
  payload,
});
