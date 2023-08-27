import { NotepadReducerStateType } from '@store/reducers/notepadReducer/types';
import { TaskListWithoutTasksType, TaskType } from '@store/reducers/tasksReducer/types';
import { UserReducerStateType } from '@store/reducers/userReducer/types';

type FirebaseTasksType = {
  [key: string]: TaskType;
};

export type FirebaseTaskListType = TaskListWithoutTasksType & {
  tasks?: FirebaseTasksType;
};

type FirebaseUserDataTextSizesType = {
  modalButtonTextSize: UserReducerStateType['modalButtonTextSize'];
  modalWindowTextSize: UserReducerStateType['modalWindowTextSize'];
  notepadTextSize: UserReducerStateType['notepadTextSize'];
  taskListTitleSize: UserReducerStateType['taskListTitleSize'];
  taskTextSize: UserReducerStateType['taskTextSize'];
};

export type FirebaseNotificationType = {
  date: string;
  notificationID: string;
  taskID: string;
  taskTitle: string;
};

export type FirebaseListOfTaskListsNotificationsType = {
  [firebaseNotificationTaskList: string]: {
    [firebaseNotification: string]: FirebaseNotificationType;
  };
};

export type FirebaseUserDataNotificationsType = {
  isDone?: FirebaseListOfTaskListsNotificationsType;
  isTodo?: FirebaseListOfTaskListsNotificationsType;
};

export type FirebaseUserDataTaskListsType = {
  [firebaseTaskList: string]: FirebaseTaskListType;
};

export type FirebaseUserDataType = {
  accentColor?: UserReducerStateType['accentColor'];
  darkMode?: boolean;
  language?: UserReducerStateType['language'];
  notepad?: {
    notepadText: NotepadReducerStateType['notepadText'];
  };
  notifications?: FirebaseUserDataNotificationsType;
  taskLists?: FirebaseUserDataTaskListsType;
  textSizes?: FirebaseUserDataTextSizesType;
  userToken?: string;
};
