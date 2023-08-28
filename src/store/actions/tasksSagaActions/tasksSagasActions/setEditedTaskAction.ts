import { TASKS_SAGA_ACTION } from '@enums/tasksSagaEnum';
import { Nullable, SetStateType } from '@root/types/common/types';
import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';
import { ColorType } from '@store/reducers/userReducer/types';

export type SetEditedTaskSagaPayloadType = {
  date: Nullable<Date>;
  editedTaskTitle: TaskType['title'];
  goBack: () => void;
  setColorMark: SetStateType<ColorType>;
  setEditedTaskTitle: SetStateType<string>;
  setIsLoading: SetStateType<boolean>;
  shouldSetColor: boolean;
  shouldSetNotification: boolean;
  taskID: TaskType['id'];
  taskListID: TaskListType['id'];

  colorMark?: ColorType;
};

export type SetEditedTaskActionSagaReturnType = {
  payload: SetEditedTaskSagaPayloadType;
  type: TASKS_SAGA_ACTION.SET_EDITED_TASK;
};

export type SetEditedTaskSagaActionType = (
  payload: SetEditedTaskSagaPayloadType,
) => SetEditedTaskActionSagaReturnType;

export const setEditedTaskAction: SetEditedTaskSagaActionType = (payload) => ({
  payload,
  type: TASKS_SAGA_ACTION.SET_EDITED_TASK,
});
