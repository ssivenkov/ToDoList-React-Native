import {createSelector} from 'reselect';
import {AppRootStateType} from '../Store';
import {TaskListType} from '../reducers/taskListReducer/Types';
import {useSelector} from 'react-redux';

const selectTaskLists = (state: AppRootStateType) => state.taskLists.taskLists;
const selectTaskListTitles = (state: AppRootStateType) =>
  state.taskLists.taskLists.map((taskList) => taskList.title);
const selectTaskListTasks = (state: AppRootStateType) =>
  state.taskLists.taskLists.map((taskList) => taskList.tasks);

export const selectModifiedTaskListById = createSelector(
  [
    selectTaskLists,
    selectTaskListTitles,
    selectTaskListTasks,
    (state: AppRootStateType, id) => id,
  ],
  (taskLists, titles, tasksList, id) => {
    const currentTaskList = taskLists
      ? taskLists.find((iterationTaskList) => iterationTaskList.id === id)!
      : null;

    const title =
      currentTaskList && titles
        ? titles.find((title) => title === currentTaskList.title)!
        : null;

    const tasks =
      currentTaskList && tasksList
        ? tasksList.find((tasks) => tasks === currentTaskList.tasks)!
        : null; // 2 одинаковых массива никогда не равны друг другу

    if (id && title) {
      const resultTaskList: TaskListType = {
        id,
        title,
        tasks,
      };

      return resultTaskList;
    } else return null;
  },
);

const state = useSelector<AppRootStateType, AppRootStateType>((state) => state);

export const taskLists = state.taskLists.taskLists
  ? state.taskLists.taskLists.map((taskList) =>
      selectModifiedTaskListById(state),
    )
  : [];
