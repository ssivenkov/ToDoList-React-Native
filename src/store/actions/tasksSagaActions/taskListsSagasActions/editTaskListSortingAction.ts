import { TASKS_SAGA_ACTION } from '@enums/tasksSagaEnum';
import { SetStateType } from '@root/types/common/types';
import { TaskListType } from '@store/reducers/tasksReducer/types';

export type EditTaskListSortingSagaPayloadType = {
  editedTaskListSorting: TaskListType['sorting'];
  setIsLoading: SetStateType<boolean>;
  setIsMenuHorizontalVisible: SetStateType<boolean>;
  setModalVisible: SetStateType<boolean>;
  taskListID: TaskListType['id'];
};

export type EditTaskListSortingSagaActionReturnType = {
  payload: EditTaskListSortingSagaPayloadType;
  type: TASKS_SAGA_ACTION.EDIT_TASK_LIST_SORTING;
};

export type EditTaskListSortingSagaActionType = (
  payload: EditTaskListSortingSagaPayloadType,
) => EditTaskListSortingSagaActionReturnType;

export const editTaskListSortingAction: EditTaskListSortingSagaActionType = (
  payload,
) => ({
  payload,
  type: TASKS_SAGA_ACTION.EDIT_TASK_LIST_SORTING,
});
