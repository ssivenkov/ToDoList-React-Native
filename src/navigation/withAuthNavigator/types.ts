import { WithAuthNavigationStylesType } from '@navigation/withAuthNavigator/styles';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs/src/types';
import { ColorType, ThemeType } from '@store/reducers/userReducer/types';

export enum withAuthNavigatorScreens {
  TASKS = 'Tasks',
  ACCOUNT = 'Account',
}

export type BottomTabParamList = {
  [K in withAuthNavigatorScreens]: undefined;
};

export type NavigatorOptionsTypeParamsType = {
  style: WithAuthNavigationStylesType;
  theme: ThemeType;
  accentColor: ColorType;
};

export type WithAuthNavigatorOptionsType = (
  params: NavigatorOptionsTypeParamsType,
) => BottomTabNavigationOptions;
