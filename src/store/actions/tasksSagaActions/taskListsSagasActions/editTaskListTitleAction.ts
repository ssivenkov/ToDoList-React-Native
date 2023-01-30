import { TASKS_SAGA_ACTION } from '@enums/tasksSagaEnum';
import { SetStateType } from '@root/types/common/types';
import { TaskListType } from '@store/reducers/tasksReducer/types';

export type EditTaskListTitleSagaPayloadType = {
  editedTaskListTitle: TaskListType['title'];
  setEditedTaskListTitleState: SetStateType<string>;
  setIsLoading: SetStateType<boolean>;
  setIsMenuHorizontalVisible: SetStateType<boolean>;
  setModalVisible: SetStateType<boolean>;
  taskListID: TaskListType['id'];
};

export type EditTaskListTitleSagaActionReturnType = {
  payload: EditTaskListTitleSagaPayloadType;
  type: TASKS_SAGA_ACTION.EDIT_TASK_LIST_TITLE;
};

export type EditTaskListTitleSagaActionType = (
  payload: EditTaskListTitleSagaPayloadType,
) => EditTaskListTitleSagaActionReturnType;

export const editTaskListTitleAction: EditTaskListTitleSagaActionType = (payload) => ({
  payload,
  type: TASKS_SAGA_ACTION.EDIT_TASK_LIST_TITLE,
});
