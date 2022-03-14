import {AppRootStateType} from '../Store';

export const titleSelectorById = (
  state: AppRootStateType,
  id: string,
): string | [] =>
  state.taskLists.taskLists.filter((taskList) => taskList.id === id)[0].title;
