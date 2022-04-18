export type TaskType = {
  id: string;
  date: string;
  isDone: boolean;
  title: string;
};

export type TaskListType = {
  id: string;
  date: string;
  title: string;
  showInToDo: boolean;
  tasks?: TaskType[];
};

export type TasksStateType = {
  taskLists: TaskListType[];
};
