import { Platform } from 'react-native';

export const ICON_SIZE_MEDIUM = 28;
export const ICON_SIZE_HALF_MEDIUM = 25;
export const ICON_SIZE_ALMOST_HALF_MEDIUM = 23;
export const ICON_SIZE_SMALL = 20;
export const ICON_SIZE_EXTRA_SMALL = 18;
export const ICON_SIZE_EXTRA_SMALL2 = 15;
export const NOTIFICATION_ID_MAX_LENGTH = 9;
export const START_ANIMATION_DELAY = 10;
export const HIDE_SPLASH_SCREEN_TIMEOUT = 600;
export const INPUT_MAX_LENGTH100 = 100;
export const INPUT_MAX_LENGTH200 = 200;
export const ONLINE = 'online';
export const screenWidth480px = 320;
export const colorPickerDefaultGapSize = 20;
export const contentMaxWidth = 450;
export const left = 'left';
export const right = 'right';
export const modalContentMaxWidth = 360;
export const defaultModalPaddingHorizontal = 16;
export const defaultModalIndentBottom = 16;
export const switcherMargin = 1;
export const infinity = 'infinity';
export const secondsInMinute = 59;
export const millisecondsInSecond = 1000;
export const PASSWORD_MIN_LENGTH = 6;
export const NOTEPAD_LINE_HEIGHT_COMPENSATION = 8;
export const ASCENDING = 'ascending';
export const DESCENDING = 'descending';
export const DATE = 'date';
export const MODIFICATION_DATE = 'modificationDate';
export const TITLE = 'title';

const IOS_APP_LOGO_DIVIDER = 2.25;
const ANDROID_APP_LOGO_DIVIDER = 2.4;

export const appLogoDivider =
  Platform.OS === 'ios' ? IOS_APP_LOGO_DIVIDER : ANDROID_APP_LOGO_DIVIDER;
