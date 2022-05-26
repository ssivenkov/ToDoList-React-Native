import {COLORS} from '@colors/colors';
import {ThemeType} from '@store/reducers/userReducer/types';

export const lightTheme: ThemeType = {
  darkMode: false,
  BACKGROUND_COLOR: '#EEEEEE',
  TASK_LIST_COLOR: COLORS.ALTO,
  TASK_COLOR: COLORS.SILVER_CHALICE,
  TEXT_COLOR: '#000000',
  BUTTON_COLOR: '#2B3237',
  PLACEHOLDER_COLOR: COLORS.ALTO,
};

export const darkTheme: ThemeType = {
  darkMode: true,
  BACKGROUND_COLOR: '#161C1E',
  TASK_LIST_COLOR: '#333333',
  TASK_COLOR: '#555555',
  TEXT_COLOR: '#FFFFFF',
  BUTTON_COLOR: '#2E363B',
  PLACEHOLDER_COLOR: '#363636',
};
