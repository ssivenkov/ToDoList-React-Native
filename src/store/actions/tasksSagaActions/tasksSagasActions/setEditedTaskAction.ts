import { IsMenuVisibleType } from '@components/task/types';
import { TASKS_SAGA_ACTION } from '@enums/tasksSagaEnum';
import { Nullable, SetStateType } from '@root/types/common/types';
import { TaskListInterface, TaskType } from '@store/reducers/tasksReducer/types';
import { ColorType } from '@store/reducers/userReducer/types';

export type SetEditedTaskSagaPayloadType = {
  taskListID: TaskListInterface['id'];
  taskID: TaskType['id'];
  editedTaskTitle: TaskType['title'];
  shouldCreateNotification: boolean;
  date: Nullable<Date>;
  setIsLoading: SetStateType<boolean>;
  setModalVisible: SetStateType<boolean>;
  setEditedTaskTitle: SetStateType<string>;
  shouldSetColor: boolean;
  setColorMark: SetStateType<ColorType>;
  setIsMenuVisible: SetStateType<IsMenuVisibleType>;

  colorMark?: ColorType;
};

export type SetEditedTaskActionSagaReturnType = {
  type: TASKS_SAGA_ACTION.SET_EDITED_TASK;
  payload: SetEditedTaskSagaPayloadType;
};

export type SetEditedTaskSagaActionType = (
  payload: SetEditedTaskSagaPayloadType,
) => SetEditedTaskActionSagaReturnType;

export const setEditedTaskAction: SetEditedTaskSagaActionType = (payload) => ({
  type: TASKS_SAGA_ACTION.SET_EDITED_TASK,
  payload,
});
