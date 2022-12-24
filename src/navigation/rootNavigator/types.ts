import { ROOT_NAVIGATOR_ROUTE } from '@enums/routesEnum';
import { RootNavigatorStylesType } from '@navigation/rootNavigator/styles';
import { BottomTabParamList } from '@navigation/withAuthNavigator/types';
import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { ColorType, ThemeType } from '@store/reducers/userReducer/types';

export type RootNativeStackNavigatorParamListType = {
  [ROOT_NAVIGATOR_ROUTE.SIGN_IN_SCREEN]: undefined;
  [ROOT_NAVIGATOR_ROUTE.WITH_AUTH_NAVIGATOR]: NavigatorScreenParams<BottomTabParamList>;
};

type RootNavigatorStyleParamsType = {
  style: RootNavigatorStylesType;
  theme: ThemeType;
  accentColor: ColorType;
};

export type ExtraScreenSettingsType = (
  params: RootNavigatorStyleParamsType,
) => NativeStackNavigationOptions;
