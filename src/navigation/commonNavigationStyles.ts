import { Platform } from 'react-native';

export const iOSHeaderHeight = 90;
export const androidHeaderHeight = 50;
export const headerHeight = Platform.OS === 'ios' ? iOSHeaderHeight : androidHeaderHeight;
export const buttonContainerMarginRight = 12;
export const headerTitleFontSize = 22;
