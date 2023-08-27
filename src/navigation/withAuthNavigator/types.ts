import { WITH_AUTH_NAVIGATOR_ROUTE } from '@enums/routesEnum';
import { TasksTopTabNavigatorParamListType } from '@navigation/tasksNavigator/types';
import { WithAuthNavigatorStylesType } from '@navigation/withAuthNavigator/styles';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs/src/types';
import { NavigatorScreenParams } from '@react-navigation/native';
import { ColorType, ThemeType } from '@store/reducers/userReducer/types';

export type WithAuthBottomTabNavigatorParamListType = {
  [WITH_AUTH_NAVIGATOR_ROUTE.TASKS_NAVIGATOR]: NavigatorScreenParams<TasksTopTabNavigatorParamListType>;
  [WITH_AUTH_NAVIGATOR_ROUTE.ACCOUNT_SCREEN]: undefined;
  [WITH_AUTH_NAVIGATOR_ROUTE.NOTEPAD_SCREEN]: undefined;
};

type WithAuthNavigatorStyleParamsType = {
  accentColor: ColorType;
  styles: WithAuthNavigatorStylesType;
  theme: ThemeType;
};

export type WithAuthNavigatorScreenSettingsType = (
  params: WithAuthNavigatorStyleParamsType,
) => BottomTabNavigationOptions;
