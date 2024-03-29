import { COLORS } from '@colors/colors';
import { ThemeType } from '@store/reducers/userReducer/types';

const {
  GALLERY,
  BLACK,
  ALTO1,
  SILVER_CHALICE1,
  SILVER_CHALICE2,
  SHARK2,
  SHARK1,
  TUNDORA,
  WHITE,
  EMPEROR,
  SHARK3,
  DOVE_GRAY,
  WOODSMOKE3,
  MINE_SHAFT1,
  MANATEE,
} = COLORS;

export const lightTheme: ThemeType = {
  BACKGROUND_COLOR: GALLERY,
  ICON_BUTTON_COLOR: SHARK2,
  MODAL_BACKGROUND_COLOR: GALLERY,
  NOTEPAD_PLACEHOLDER_COLOR: ALTO1,
  PLACEHOLDER_COLOR: ALTO1,
  SUBTEXT_COLOR: EMPEROR,
  TAB_BAR_BACKGROUND_COLOR: WHITE,
  TAB_BAR_ICON_COLOR: TUNDORA,
  TAB_BAR_TEXT_COLOR: SHARK2,
  TASK_COLOR: SILVER_CHALICE1,
  TASK_LIST_COLOR: ALTO1,
  TEXT_COLOR: BLACK,
  darkMode: false,
};

export const darkTheme: ThemeType = {
  BACKGROUND_COLOR: SHARK3,
  ICON_BUTTON_COLOR: SILVER_CHALICE2,
  MODAL_BACKGROUND_COLOR: SHARK1,
  NOTEPAD_PLACEHOLDER_COLOR: SHARK3,
  PLACEHOLDER_COLOR: DOVE_GRAY,
  SUBTEXT_COLOR: MANATEE,
  TAB_BAR_BACKGROUND_COLOR: WOODSMOKE3,
  TAB_BAR_ICON_COLOR: MANATEE,
  TAB_BAR_TEXT_COLOR: DOVE_GRAY,
  TASK_COLOR: MINE_SHAFT1,
  TASK_LIST_COLOR: WOODSMOKE3,
  TEXT_COLOR: WHITE,
  darkMode: true,
};
