export type TaskType = {
  id: string;
  date: string;
  isDone: boolean;
  title: string;
};

export type TaskListWithTaskType = {
  id: string;
  date: string;
  title: string;
  showInToDo: boolean;
};

type TasksObjectType = {
  [key: string]: TaskType;
};

export interface TaskListBeforeConvertInterface extends TaskListWithTaskType {
  tasks?: TasksObjectType;
}

export interface TaskListInterface extends TaskListWithTaskType {
  tasks?: TaskType[];
}

export type TasksStateType = {
  taskLists: TaskListInterface[];
};

export type ConvertedTasksForFirebaseType = {
  [T: string]: TaskType;
};
