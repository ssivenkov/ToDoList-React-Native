export type TaskListType = {
  title: string;
  tasks: string[];
};

export type InitialTasksStateType = {
  toDoTaskLists: Array<TaskListType>;
  doneTaskLists: Array<TaskListType>;
};
