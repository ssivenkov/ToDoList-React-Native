import {TASKS_SAGA_ACTIONS} from '@enums/tasksSagaEnum';
import {Nullable, SetStateType} from '@root/types/common/types';

export type SetEditedTaskSagaPayloadType = {
  taskListId: string;
  taskId: string;
  editedTaskTitle: string;
  shouldCreateNotification: boolean;
  date: Nullable<Date>;
  setIsLoading: SetStateType<boolean>;
  setModalVisible: SetStateType<boolean>;
  setEditedTaskTitle: SetStateType<string>;
};

export type SetEditedTaskActionSagaReturnType = {
  type: TASKS_SAGA_ACTIONS.SET_EDITED_TASK;
  payload: SetEditedTaskSagaPayloadType;
};

export type SetEditedTaskSagaActionType = (
  payload: SetEditedTaskSagaPayloadType,
) => SetEditedTaskActionSagaReturnType;

export const setEditedTask: SetEditedTaskSagaActionType = (payload) => ({
  type: TASKS_SAGA_ACTIONS.SET_EDITED_TASK,
  payload,
});
