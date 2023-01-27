import { TASKS_REDUCER_ACTION } from '@enums/tasksReducerEnum';
import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';
import { ColorType } from '@store/reducers/userReducer/types';

type SetEditedTaskActionPayloadType = {
  editedTaskTitle: TaskType['title'];
  taskID: TaskType['id'];
  taskListID: TaskListType['id'];

  colorMark?: ColorType;
};

export type SetEditedTaskActionReturnType = {
  payload: SetEditedTaskActionPayloadType;
  type: TASKS_REDUCER_ACTION.EDIT_TASK;
};

export type SetEditedTaskActionType = (
  payload: SetEditedTaskActionPayloadType,
) => SetEditedTaskActionReturnType;

export const setEditedTaskAction: SetEditedTaskActionType = (payload) => ({
  payload,
  type: TASKS_REDUCER_ACTION.EDIT_TASK,
});
