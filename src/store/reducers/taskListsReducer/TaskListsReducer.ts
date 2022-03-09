import {TASK_LISTS_ACTIONS} from '../../../enums/TasksEnum';
import {InitialTasksStateType} from 'store/reducers/taskListsReducer/Types';
import {TaskListsActionsType} from 'store/actions/TasksActions/Types';

const initialTaskListsState: InitialTasksStateType = {
  toDoTaskLists: [{title: 'Todo task list 1', tasks: ['task 1']}],
  doneTaskLists: [{title: 'Done task list 2', tasks: ['task 1']}],
};

export const taskListsReducer = (
  state: InitialTasksStateType = initialTaskListsState,
  action: TaskListsActionsType,
) => {
  switch (action.type) {
    case TASK_LISTS_ACTIONS.SET_TASK_LISTS:
      return {...state};
    default:
      return state;
  }
};
