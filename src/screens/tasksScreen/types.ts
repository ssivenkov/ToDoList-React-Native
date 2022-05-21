import {
  TaskNavigatorScreens,
  TopTabParamList,
} from '@navigation/tasksNavigator/types';
import {RouteProp} from '@react-navigation/native';

export type TaskScreenRouteType = RouteProp<
  TopTabParamList,
  TaskNavigatorScreens.TODO
>;
