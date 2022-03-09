import {TASK_LISTS_ACTIONS} from 'enums/TasksEnum';
import {SetTasksActionsType} from 'store/actions/TasksActions/Types';
import {TaskListType} from '../../reducers/taskListsReducer/Types';

export const setTasks = (tasks: Array<TaskListType>): SetTasksActionsType => ({
  type: TASK_LISTS_ACTIONS.SET_TASK_LISTS,
  tasks: tasks,
});
