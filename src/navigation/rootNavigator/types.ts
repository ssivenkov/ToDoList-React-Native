import { ROOT_NAVIGATOR_ROUTE } from '@enums/routesEnum';
import { BottomTabParamList } from '@navigation/withAuthNavigator/types';
import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { ColorType } from '@store/reducers/userReducer/types';

export type RootNativeStackNavigatorParamListType = {
  [ROOT_NAVIGATOR_ROUTE.SIGN_IN_SCREEN]: undefined;
  [ROOT_NAVIGATOR_ROUTE.WITH_AUTH_NAVIGATOR]: NavigatorScreenParams<BottomTabParamList>;
  [ROOT_NAVIGATOR_ROUTE.CONTACT_THE_AUTHOR_SCREEN]: undefined;
};

type NativeStackExtraScreenStyleParamsType = {
  accentColor: ColorType;
};

export type NativeStackExtraScreenSettingsType = (
  params: NativeStackExtraScreenStyleParamsType,
) => NativeStackNavigationOptions;
