import { isTodoTaskListType } from '@components/taskList/types';
import { ROOT_NAVIGATOR_ROUTE } from '@enums/routesEnum';
import { SignInStackNavigatorParamListType } from '@navigation/signInNavigator/types';
import { WithAuthBottomTabNavigatorParamListType } from '@navigation/withAuthNavigator/types';
import { NavigatorScreenParams } from '@react-navigation/native';
import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';

export type AddTaskScreenParamListType = {
  fullTaskList: TaskListType;
  taskListDate: TaskListType['date'];
  taskListID: TaskListType['id'];
  taskListTitle: TaskType['title'];
};

export type EditTaskScreenParamListType = {
  creationDate: TaskType['date'];
  isTodo: isTodoTaskListType;
  modificationDate: TaskType['modificationDate'];
  oldTaskTitle: TaskType['title'];
  taskID: TaskType['id'];
  taskListID: TaskListType['id'];

  colorMark?: TaskType['colorMark'];
};

export type RootNativeStackNavigatorParamListType = {
  [ROOT_NAVIGATOR_ROUTE.SIGN_IN_NAVIGATOR]: NavigatorScreenParams<SignInStackNavigatorParamListType>;
  [ROOT_NAVIGATOR_ROUTE.WITH_AUTH_NAVIGATOR]: NavigatorScreenParams<WithAuthBottomTabNavigatorParamListType>;
  [ROOT_NAVIGATOR_ROUTE.ADD_TASK_SCREEN]: AddTaskScreenParamListType;
  [ROOT_NAVIGATOR_ROUTE.EDIT_TASK_SCREEN]: EditTaskScreenParamListType;
  [ROOT_NAVIGATOR_ROUTE.ADJUST_TEXT_SIZES_SCREEN]: undefined;
  [ROOT_NAVIGATOR_ROUTE.CONTACT_THE_AUTHOR_SCREEN]: undefined;
};
