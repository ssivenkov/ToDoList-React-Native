import { isTodoTaskListType } from '@components/taskList/types';
import { ROOT_NAVIGATOR_ROUTE } from '@enums/routesEnum';
import { BottomTabParamList } from '@navigation/withAuthNavigator/types';
import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { TaskListInterface, TaskType } from '@store/reducers/tasksReducer/types';
import { ColorType } from '@store/reducers/userReducer/types';

export type AddTaskScreenParamList = {
  fullTaskList: TaskListInterface;
  taskListDate: TaskListInterface['date'];
  taskListID: TaskListInterface['id'];
  taskListTitle: TaskType['title'];
};

export type EditTaskScreenParamList = {
  isTodo: isTodoTaskListType;
  oldTaskTitle: TaskType['title'];
  taskListID: TaskListInterface['id'];
  taskID: TaskType['id'];

  colorMark?: TaskType['colorMark'];
};

export type RootNativeStackNavigatorParamListType = {
  [ROOT_NAVIGATOR_ROUTE.SIGN_IN_SCREEN]: undefined;
  [ROOT_NAVIGATOR_ROUTE.WITH_AUTH_NAVIGATOR]: NavigatorScreenParams<BottomTabParamList>;
  [ROOT_NAVIGATOR_ROUTE.CONTACT_THE_AUTHOR_SCREEN]: undefined;
  [ROOT_NAVIGATOR_ROUTE.ADD_TASK_SCREEN]: AddTaskScreenParamList;
  [ROOT_NAVIGATOR_ROUTE.EDIT_TASK_SCREEN]: EditTaskScreenParamList;
};

type NativeStackExtraScreenStyleParamsType = {
  accentColor: ColorType;
};

export type NativeStackExtraScreenSettingsType = (
  params: NativeStackExtraScreenStyleParamsType,
) => NativeStackNavigationOptions;
