import { SIGN_IN_NAVIGATOR_ROUTE } from '@enums/routesEnum';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type SignInStackNavigatorParamListType = {
  [SIGN_IN_NAVIGATOR_ROUTE.SIGN_IN_SCREEN]: undefined;
  [SIGN_IN_NAVIGATOR_ROUTE.SIGN_IN_SELECT_OPTION_SCREEN]: undefined;
  [SIGN_IN_NAVIGATOR_ROUTE.SIGN_IN_OPTION_SCREEN]: undefined;
  [SIGN_IN_NAVIGATOR_ROUTE.REGISTER_OPTION_SCREEN]: undefined;
};

export type SignInScreenPropsType = NativeStackScreenProps<
  SignInStackNavigatorParamListType,
  SIGN_IN_NAVIGATOR_ROUTE.SIGN_IN_SCREEN
>;

export type SignInSelectOptionScreenPropsType = NativeStackScreenProps<
  SignInStackNavigatorParamListType,
  SIGN_IN_NAVIGATOR_ROUTE.SIGN_IN_SELECT_OPTION_SCREEN
>;
