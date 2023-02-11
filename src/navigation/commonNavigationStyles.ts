import { Platform } from 'react-native';

export const iOSHeaderHeight = 90;
export const androidHeaderHeight = 50;
export const headerTitleFontSize = 20;
export const iOSTabBarContainerHeight = 82;
export const androidTabBarContainerHeight = 50;

export const headerHeight = Platform.OS === 'ios' ? iOSHeaderHeight : androidHeaderHeight;
export const tabBarContainerHeight =
  Platform.OS === 'ios' ? iOSTabBarContainerHeight : androidTabBarContainerHeight;
