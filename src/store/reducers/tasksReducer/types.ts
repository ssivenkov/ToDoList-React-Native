export type TaskType = {
  id: string;
  date: string;
  isDone: boolean;
  title: string;

  colorMark?: string;
};

export type TaskListWithoutTasksType = {
  id: string;
  date: string;
  title: string;
  showInToDo: boolean;
};

type TasksObjectType = {
  [key: string]: TaskType;
};

export interface TaskListBeforeConvertInterface
  extends TaskListWithoutTasksType {
  tasks?: TasksObjectType;
}

export interface TaskListInterface extends TaskListWithoutTasksType {
  tasks?: TaskType[];
}

export type NotificationType = {
  taskID: TaskType['id'];

  notificationID?: string;
  date?: Date;
};

export type TasksReducerStateType = {
  taskLists: TaskListInterface[];
  notifications: NotificationType[];
};

export type ConvertedTasksForFirebaseType = {
  [T: string]: TaskType;
};
