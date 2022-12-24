import { RootNativeStackNavigatorParamListType } from "@navigation/rootNavigator/types";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootNativeStackNavigatorParamListType {}
  }
}
