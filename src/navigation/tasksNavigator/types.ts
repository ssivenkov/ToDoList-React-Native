import { TasksNavigationStylesType } from '@navigation/tasksNavigator/styles';
import { MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs/lib/typescript/src/types';
import { ColorType, ThemeType } from '@store/reducers/userReducer/types';

export enum TaskNavigatorScreens {
  TODO = 'ToDo',
  DONE = 'Done',
}

export type TopTabParamList = {
  [K in TaskNavigatorScreens]: {
    isTodoScreen: boolean;
  };
};

export type NavigatorOptionsTypeParamsType = {
  style: TasksNavigationStylesType;
  theme: ThemeType;
  accentColor: ColorType;
};

export type TasksNavigatorOptionsType = (
  params: NavigatorOptionsTypeParamsType,
) => MaterialTopTabNavigationOptions;
