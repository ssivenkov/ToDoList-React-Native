import { TASKS_NAVIGATOR_ROUTE } from '@enums/routesEnum';
import { TasksNavigatorStylesType } from '@navigation/tasksNavigator/styles';
import { MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs/lib/typescript/src/types';
import { ColorType, ThemeType } from '@store/reducers/userReducer/types';

export type TopTabParamListType = {
  [TASKS_NAVIGATOR_ROUTE.TODO_TASKS_SCREEN]: { isTodoScreen: boolean };
  [TASKS_NAVIGATOR_ROUTE.DONE_TASKS_SCREEN]: { isTodoScreen: boolean };
};

type TasksNavigatorStyleParamsType = {
  style: TasksNavigatorStylesType;
  theme: ThemeType;
  accentColor: ColorType;
};

export type TasksNavigatorSettingsType = (
  params: TasksNavigatorStyleParamsType,
) => MaterialTopTabNavigationOptions;
