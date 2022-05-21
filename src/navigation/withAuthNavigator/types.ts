export enum withAuthNavigatorScreens {
  TASKS = 'Tasks',
  ACCOUNT = 'Account',
}

export type BottomTabParamList = {
  [K in withAuthNavigatorScreens]: undefined;
};
