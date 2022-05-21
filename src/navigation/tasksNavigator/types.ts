/*import type {RouteProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';*/

export enum TaskNavigatorScreens {
  TODO = 'ToDo',
  DONE = 'Done',
}

export type TopTabParamList = {
  [K in TaskNavigatorScreens]: {
    isTodoScreen: boolean;
  };
};

/*export type TaskScreenPropsType<T extends keyof TopTabParamList> = {
  navigation: NativeStackNavigationProp<TopTabParamList, T>;
  route: RouteProp<TopTabParamList, T>;
};*/
