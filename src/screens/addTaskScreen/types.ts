import { ROOT_NAVIGATOR_ROUTE } from '@enums/routesEnum';
import { RootNativeStackNavigatorParamListType } from '@navigation/rootNavigator/types';
import { RouteProp } from '@react-navigation/native';

export type AddTaskScreenRouteType = RouteProp<
  RootNativeStackNavigatorParamListType,
  ROOT_NAVIGATOR_ROUTE.ADD_TASK_SCREEN
>;
