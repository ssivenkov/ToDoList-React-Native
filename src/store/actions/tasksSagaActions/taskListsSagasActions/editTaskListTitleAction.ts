import { TASKS_SAGA_ACTION } from '@enums/tasksSagaEnum';
import { SetStateType } from '@root/types/common/types';
import { TaskListType } from '@store/reducers/tasksReducer/types';

export type EditTaskListTitleSagaPayloadType = {
  taskListID: TaskListType['id'];
  editedTaskListTitle: TaskListType['title'];
  setIsLoading: SetStateType<boolean>;
  setModalVisible: SetStateType<boolean>;
  setEditedTaskListTitleState: SetStateType<string>;
};

export type EditTaskListTitleSagaActionReturnType = {
  type: TASKS_SAGA_ACTION.EDIT_TASK_LIST_TITLE;
  payload: EditTaskListTitleSagaPayloadType;
};

export type EditTaskListTitleSagaActionType = (
  payload: EditTaskListTitleSagaPayloadType,
) => EditTaskListTitleSagaActionReturnType;

export const editTaskListTitleAction: EditTaskListTitleSagaActionType = (payload) => ({
  type: TASKS_SAGA_ACTION.EDIT_TASK_LIST_TITLE,
  payload,
});
