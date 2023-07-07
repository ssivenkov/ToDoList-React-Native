import { TASKS_NAVIGATOR_ROUTE } from '@enums/routesEnum';
import { TasksTopTabNavigatorParamListType } from '@navigation/tasksNavigator/types';
import { RouteProp } from '@react-navigation/native';

export type TaskScreenRouteType = RouteProp<
  TasksTopTabNavigatorParamListType,
  TASKS_NAVIGATOR_ROUTE.TODO_TASKS_SCREEN | TASKS_NAVIGATOR_ROUTE.DONE_TASKS_SCREEN
>;
