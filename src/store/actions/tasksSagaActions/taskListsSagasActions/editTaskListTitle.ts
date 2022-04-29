import {TASKS_SAGA_ACTIONS} from '@enums/tasksSagaEnum';
import {SetStateType} from '@root/types/common/types';

export type EditTaskListTitleSagaPayloadType = {
  taskListId: string;
  editedTaskListTitle: string;
  setIsLoading: SetStateType<boolean>;
  setModalVisible: SetStateType<boolean>;
  setEditedTaskListTitleState: SetStateType<string>;
};

export type EditTaskListTitleSagaActionReturnType = {
  type: TASKS_SAGA_ACTIONS.EDIT_TASK_LIST_TITLE;
  payload: EditTaskListTitleSagaPayloadType;
};

export type EditTaskListTitleSagaActionType = (
  payload: EditTaskListTitleSagaPayloadType,
) => EditTaskListTitleSagaActionReturnType;

export const editTaskListTitle: EditTaskListTitleSagaActionType = (
  payload,
) => ({
  type: TASKS_SAGA_ACTIONS.EDIT_TASK_LIST_TITLE,
  payload,
});
