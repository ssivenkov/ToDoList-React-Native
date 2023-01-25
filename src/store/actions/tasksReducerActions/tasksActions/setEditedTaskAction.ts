import { TASKS_REDUCER_ACTION } from '@enums/tasksReducerEnum';
import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';
import { ColorType } from '@store/reducers/userReducer/types';

type SetEditedTaskActionPayloadType = {
  taskListID: TaskListType['id'];
  taskID: TaskType['id'];
  editedTaskTitle: TaskType['title'];

  colorMark?: ColorType;
};

export type SetEditedTaskActionReturnType = {
  type: TASKS_REDUCER_ACTION.EDIT_TASK;
  payload: SetEditedTaskActionPayloadType;
};

export type SetEditedTaskActionType = (
  payload: SetEditedTaskActionPayloadType,
) => SetEditedTaskActionReturnType;

export const setEditedTaskAction: SetEditedTaskActionType = (payload) => ({
  type: TASKS_REDUCER_ACTION.EDIT_TASK,
  payload,
});
