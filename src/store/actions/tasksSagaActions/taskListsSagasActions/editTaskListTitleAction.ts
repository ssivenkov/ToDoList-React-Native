import {TASKS_SAGA_ACTIONS} from '@enums/tasksSagaEnum';
import {SetStateType} from '@root/types/common/types';
import {TaskListInterface} from '@store/reducers/tasksReducer/types';

export type EditTaskListTitleSagaPayloadType = {
  taskListId: TaskListInterface['id'];
  editedTaskListTitle: TaskListInterface['title'];
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

export const editTaskListTitleAction: EditTaskListTitleSagaActionType = (
  payload,
) => ({
  type: TASKS_SAGA_ACTIONS.EDIT_TASK_LIST_TITLE,
  payload,
});
