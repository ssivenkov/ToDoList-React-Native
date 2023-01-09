import { Platform } from 'react-native';

export const iOSHeaderHeight = 90;
export const androidHeaderHeight = 50;
export const headerButtonMargin = 12;
export const headerTitleFontSize = 22;
export const iOSTabBarContainerHeight = 82;
export const androidTabBarContainerHeight = 50;

export const headerHeight = Platform.OS === 'ios' ? iOSHeaderHeight : androidHeaderHeight;
export const tabBarContainerHeight =
  Platform.OS === 'ios' ? iOSTabBarContainerHeight : androidTabBarContainerHeight;
