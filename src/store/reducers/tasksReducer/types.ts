export type TaskType = {
  id: string;
  isDone: boolean;
  title: string;
};

export type TaskListType = {
  id: string;
  title: string;
  showInToDo: boolean;
  tasks: TaskType[];
};

export type TasksStateType = {
  taskLists: TaskListType[];
};
