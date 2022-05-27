import {COLORS} from '@colors/colors';
import {ThemeType} from '@store/reducers/userReducer/types';

export const lightTheme: ThemeType = {
  darkMode: false,
  BACKGROUND_COLOR: COLORS.GALLERY,
  TASK_LIST_COLOR: COLORS.ALTO,
  TASK_COLOR: COLORS.SILVER_CHALICE,
  TEXT_COLOR: COLORS.BLACK,
  BUTTON_COLOR: COLORS.OUTER_SPACE,
  PLACEHOLDER_COLOR: COLORS.ALTO,
};

export const darkTheme: ThemeType = {
  darkMode: true,
  BACKGROUND_COLOR: '#161C1E',
  TASK_LIST_COLOR: '#333333',
  TASK_COLOR: '#555555',
  TEXT_COLOR: COLORS.WHITE,
  BUTTON_COLOR: '#2E363B',
  PLACEHOLDER_COLOR: '#363636',
};
