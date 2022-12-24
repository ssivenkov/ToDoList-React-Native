import { WITH_AUTH_NAVIGATOR_ROUTE } from '@enums/routesEnum';
import { TopTabParamListType } from '@navigation/tasksNavigator/types';
import { WithAuthNavigatorStylesType } from '@navigation/withAuthNavigator/styles';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs/src/types';
import { NavigatorScreenParams } from '@react-navigation/native';
import { ColorType, ThemeType } from '@store/reducers/userReducer/types';

export type BottomTabParamList = {
  [WITH_AUTH_NAVIGATOR_ROUTE.TASKS_NAVIGATOR]: NavigatorScreenParams<TopTabParamListType>;
  [WITH_AUTH_NAVIGATOR_ROUTE.ACCOUNT_SCREEN]: undefined;
};

type WithAuthNavigatorStyleParamsType = {
  style: WithAuthNavigatorStylesType;
  theme: ThemeType;
  accentColor: ColorType;
};

export type WithAuthNavigatorScreenSettingsType = (
  params: WithAuthNavigatorStyleParamsType,
) => BottomTabNavigationOptions;
